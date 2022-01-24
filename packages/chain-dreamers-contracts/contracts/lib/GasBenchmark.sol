// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasBenchmark {
    uint256[] tokenIdsUint256;
    bytes tokenIdsBytes;

    function loopPush(uint256[] memory input) public {
        for (uint256 i = 0; i < input.length; i++) {
            tokenIdsUint256.push(input[i]);
        }
    }

    function concatPush(bytes memory input) public {
        tokenIdsBytes = bytes.concat(tokenIdsBytes, input);
    }

    function abiEncodePush(bytes memory input) public {
        tokenIdsBytes = abi.encodePacked(tokenIdsBytes, input);
    }

    function loopConcatPush(bytes[] memory input) public {
        for (uint256 i = 0; i < input.length; i++) {
            tokenIdsBytes = bytes.concat(tokenIdsBytes, input[i]);
        }
    }

    function concatBytes2(bytes2 input) public {
        tokenIdsBytes = bytes.concat(tokenIdsBytes, input);
    }
}
