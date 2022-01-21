// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface ICandyShop {
    function burnBatch(uint256[] calldata tokenIds, uint256[] calldata amounts)
        external;

    function burn(uint256 tokenId, uint256 amount) external;
}
