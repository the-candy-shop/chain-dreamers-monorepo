// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../tokens/ERC721Enumerable.sol";
import "../interfaces/IDreamersRenderer.sol";
import "../interfaces/ICandyShop.sol";
import "../interfaces/IChainRunners.sol";

contract OpenSeaProxyRegistry {
    mapping(address => address) public proxies;
}

contract ChainDreamers is ERC721Enumerable, Ownable, ReentrancyGuard {
    // Linked contracts
    address public renderingContractAddress;
    address public candyShopAddress;
    address public chainRunnersAddress;
    IDreamersRenderer renderer;
    ICandyShop candyShop;
    IChainRunners chainRunners;

    /// @dev Copied from ApeRunner's contract
    /// @notice OpenSea proxy registry.
    address public opensea;
    /// @notice LooksRare marketplace transfer manager.
    address public looksrare;
    /// @notice Check if marketplaces pre-approve is enabled.
    bool public marketplacesApproved = true;

    mapping(address => bool) proxyToApproved;

    /// @notice Set opensea to `opensea_`.
    function setOpensea(address opensea_) external onlyOwner {
        opensea = opensea_;
    }

    /// @notice Set looksrare to `looksrare_`.
    function setLooksrare(address looksrare_) external onlyOwner {
        looksrare = looksrare_;
    }

    /// @notice Toggle pre-approve feature state for sender.
    function toggleMarketplacesApproved() external onlyOwner {
        marketplacesApproved = !marketplacesApproved;
    }

    /// @notice Approve the communication and interaction with cross-collection interactions.
    function flipProxyState(address proxyAddress) public onlyOwner {
        proxyToApproved[proxyAddress] = !proxyToApproved[proxyAddress];
    }

    /// @dev Modified for opensea and looksrare pre-approve so users can make truly gas less sales.
    function isApprovedForAll(address owner, address operator)
        public
        view
        override
        returns (bool)
    {
        if (!marketplacesApproved)
            return super.isApprovedForAll(owner, operator);

        return
            operator == OpenSeaProxyRegistry(opensea).proxies(owner) ||
            operator == looksrare ||
            proxyToApproved[operator] ||
            super.isApprovedForAll(owner, operator);
    }

    // Constants
    uint256 public maxDreamersMintPublicSale;
    uint256 public constant MINT_PUBLIC_PRICE = 0.05 ether;

    // State variables
    uint256 public publicSaleStartTimestamp;

    function setPublicSaleTimestamp(uint256 timestamp) external onlyOwner {
        publicSaleStartTimestamp = timestamp;
    }

    function isPublicSaleOpen() public view returns (bool) {
        return
            block.timestamp > publicSaleStartTimestamp &&
            publicSaleStartTimestamp != 0;
    }

    modifier whenPublicSaleActive() {
        require(isPublicSaleOpen(), "Public sale not open");
        _;
    }

    function setRenderingContractAddress(address _renderingContractAddress)
        public
        onlyOwner
    {
        renderingContractAddress = _renderingContractAddress;
        renderer = IDreamersRenderer(renderingContractAddress);
    }

    function setCandyShopAddress(address _candyShopContractAddress)
        public
        onlyOwner
    {
        candyShopAddress = _candyShopContractAddress;
        candyShop = ICandyShop(candyShopAddress);
    }

    function setMaxDreamersMintPublicSale(uint256 _maxDreamersMintPublicSale)
        public
        onlyOwner
    {
        maxDreamersMintPublicSale = _maxDreamersMintPublicSale;
    }

    function setChainRunnersContractAddress(
        address _chainRunnersContractAddress
    ) public onlyOwner {
        chainRunnersAddress = _chainRunnersContractAddress;
        chainRunners = IChainRunners(_chainRunnersContractAddress);
    }

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    /// @notice Use this to AirDrop the tokens to the owner instead of minting them for lower gas costs.
    function airDropBatch(
        address to,
        uint16[] memory tokenIds,
        uint256[] memory candyIds,
        uint256[] memory candyAmounts
    ) external nonReentrant onlyOwner {
        bytes32 candies = keccak256(
            abi.encodePacked(
                candyIds,
                tokenIds,
                msg.sender,
                block.timestamp,
                block.difficulty,
                to
            )
        );

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(_owners[tokenIds[i]] == address(0), "Token already exists");
            _owners[tokenIds[i]] = to;
            dreamers[tokenIds[i]] = ChainDreamersTypes.ChainDreamer(
                ((uint8(candies[0]) >> 2) << 2) + (uint8(candyIds[i]) % 4)
            );
            candies >>= 1;
        }
        _balances[to] += uint16(tokenIds.length);
        candyShop.burnBatch(to, candyIds, candyAmounts);
    }

    /// @param tokenIds a bytes interpreted as an array of uint16
    /// @param ownerTokenIndexes a bytes interpreted as an array of uint16. Given here to avoid indexes computation and save gas
    /// @param candyIdsBytes a bytes interpreted as an array of uint8
    /// @param candyIds the same indexes as above but as a uint8 array
    /// @param candyAmounts should be an array of 1
    function mintBatchRunnersAccess(
        bytes calldata tokenIds,
        bytes calldata ownerTokenIndexes,
        bytes calldata candyIdsBytes,
        uint256[] calldata candyIds,
        uint256[] calldata candyAmounts
    ) public nonReentrant returns (bool) {
        require(
            candyIdsBytes.length == candyIds.length,
            "Candy ids should have the same length"
        );
        require(
            tokenIds.length == candyIdsBytes.length * 2,
            "Each runner needs its own candy"
        );

        for (uint256 i = 0; i < tokenIds.length; i += 2) {
            require(
                chainRunners.ownerOf(BytesLib.toUint16(tokenIds, i)) ==
                    _msgSender(),
                "You cannot give candies to a runner that you do not own"
            );
            require(
                uint8(candyIds[i / 2]) == uint8(candyIdsBytes[i / 2]),
                "Candy ids should be the same"
            );
            require(
                candyAmounts[i / 2] == 1,
                "Your runner needs one and only one candy, who knows what could happen otherwise"
            );
        }
        _safeMintBatchWithCandies(
            _msgSender(),
            tokenIds,
            ownerTokenIndexes,
            candyIdsBytes
        );
        candyShop.burnBatch(_msgSender(), candyIds, candyAmounts);
        return true;
    }

    function mintBatchPublicSale(
        bytes calldata tokenIds,
        bytes calldata ownerTokenIndexes
    ) public payable nonReentrant whenPublicSaleActive returns (bool) {
        require(
            (tokenIds.length / 2) * MINT_PUBLIC_PRICE == msg.value,
            "You have to pay the bail bond"
        );
        require(
            ERC721.balanceOf(_msgSender()) + tokenIds.length / 2 <=
                maxDreamersMintPublicSale,
            "Your home is to small to welcome so many dreamers"
        );
        _safeMintBatch(_msgSender(), tokenIds, ownerTokenIndexes);
        return true;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(uint16(_tokenId)),
            "ERC721: URI query for nonexistent token"
        );

        if (renderingContractAddress == address(0)) {
            return "";
        }

        return renderer.tokenURI(_tokenId, dreamers[uint16(_tokenId)]);
    }

    receive() external payable {}

    function withdraw() public onlyOwner {
        (bool success, ) = _msgSender().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
