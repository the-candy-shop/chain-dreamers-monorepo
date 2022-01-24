// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/extensions/ERC721Enumerable.sol)

pragma solidity ^0.8.0;

import "./ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "solidity-bytes-utils/contracts/BytesLib.sol";

/**
 * @dev This implementation leverages the fact that there is 10k runners and so at most 10k dreamers as well.
 *      We then used bytes to stores tokens and indexes and uses uint16 (bytes2) everywhere.
 *      Using bytes.concat to batch mint will save heaps of gas.
 */
abstract contract ERC721Enumerable is ERC721, IERC721Enumerable {
    // Mapping from owner to list of owned token IDs
    mapping(address => bytes) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    bytes private _ownedTokensIndex;

    // Array with all token ids, used for enumeration, two bytes per tokenId (uint16)
    bytes private _allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(uint16 => uint16) private _allTokensIndex;

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, ERC721)
        returns (bool)
    {
        return
            interfaceId == type(IERC721Enumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721Enumerable-tokenOfOwnerByIndex}.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            index < ERC721.balanceOf(owner),
            "ERC721Enumerable: owner index out of bounds"
        );
        return BytesLib.toUint16(_ownedTokens[owner], index * 2);
    }

    /**
     * @dev See {IERC721Enumerable-totalSupply}.
     */
    function totalSupply() public view virtual override returns (uint256) {
        return _allTokens.length / 2;
    }

    /**
     * @dev See {IERC721Enumerable-tokenByIndex}.
     */
    function tokenByIndex(uint256 index)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            index < ERC721Enumerable.totalSupply(),
            "ERC721Enumerable: global index out of bounds"
        );
        return BytesLib.toUint16(_allTokens, index * 2);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint16 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            // Token is minted, add it to the global list
            uint16 tokenIndex = uint16(_allTokens.length);
            _allTokensIndex[tokenId] = tokenIndex;
            _allTokens = bytes.concat(_allTokens, bytes2(tokenId));

            // Add it to the minter list as well
            bytes2 length = bytes2(uint16(_ownedTokens[to].length));
            _ownedTokensIndex = bytes.concat(_ownedTokensIndex, length);
            _ownedTokens[to] = bytes.concat(_ownedTokens[to], bytes2(tokenId));
        } else if (to == address(0)) {
            // Token is burnt, remove it from the global list
            uint16 tokenIndex = _allTokensIndex[tokenId];

            _allTokens = bytes.concat(
                BytesLib.slice(_allTokens, 0, tokenIndex),
                BytesLib.slice(
                    _allTokens,
                    tokenIndex + 2,
                    _allTokens.length - tokenIndex - 2
                )
            );

            uint16 tokenIndexForOwner = BytesLib.toUint16(
                _ownedTokensIndex,
                tokenIndex
            );

            _ownedTokens[from] = bytes.concat(
                BytesLib.slice(_ownedTokens[from], 0, tokenIndexForOwner),
                BytesLib.slice(
                    _ownedTokens[from],
                    tokenIndexForOwner + 2,
                    _ownedTokens[from].length - tokenIndexForOwner - 2
                )
            );
        } else if (from != to) {
            // Get indexes in global bytes and in owner's bytes
            uint16 tokenIndex = _allTokensIndex[tokenId];
            uint16 tokenIndexForOwner = BytesLib.toUint16(
                _ownedTokensIndex,
                tokenIndex
            );

            // Remove from "from" bytes and add to "to" one's
            _ownedTokens[from] = bytes.concat(
                BytesLib.slice(_ownedTokens[from], 0, tokenIndexForOwner),
                BytesLib.slice(
                    _ownedTokens[from],
                    tokenIndexForOwner + 2,
                    _ownedTokens[from].length - tokenIndexForOwner - 2
                )
            );
            bytes2 length = bytes2(uint16(_ownedTokens[to].length));
            _ownedTokens[to] = bytes.concat(_ownedTokens[to], bytes2(tokenId));

            // Update owner's index
            _ownedTokensIndex[tokenIndex] = length[0];
            _ownedTokensIndex[tokenIndex + 1] = length[1];
        }
    }

    function _beforeBatchMint(
        address to,
        bytes calldata tokenIds,
        bytes calldata ownerTokenIndexes
    ) internal virtual override {
        uint16 firstIndex = BytesLib.toUint16(ownerTokenIndexes, 0);
        require(
            tokenIds.length == ownerTokenIndexes.length,
            "ownerIndexes must have the same length as tokenIds"
        );
        require(
            _ownedTokens[to].length == firstIndex * 2,
            "The given ownerTokenIndexes do not start from the current owner count"
        );

        // Add them to the minter list
        _ownedTokensIndex = bytes.concat(_ownedTokensIndex, ownerTokenIndexes);
        _ownedTokens[to] = bytes.concat(_ownedTokens[to], tokenIds);

        // Add tokens to the global list
        uint16 tokenIndex = uint16(_allTokens.length);
        for (uint16 i = 0; i < tokenIds.length; i += 2) {
            require(
                BytesLib.toUint16(ownerTokenIndexes, i) == firstIndex + i / 2,
                "ownerTokenIndexes must be a sequence"
            );
            uint16 tokenId = BytesLib.toUint16(tokenIds, i);
            _allTokensIndex[tokenId] = tokenIndex + i;
        }
        _allTokens = bytes.concat(_allTokens, tokenIds);
    }
}
