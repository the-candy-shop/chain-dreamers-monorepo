// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "../dreamers/ChainDreamersTypes.sol";

interface IDreamersRenderer {
    function tokenURI(
        uint256 tokenId,
        ChainDreamersTypes.ChainDreamer memory dreamer
    ) external view returns (string memory);
}
