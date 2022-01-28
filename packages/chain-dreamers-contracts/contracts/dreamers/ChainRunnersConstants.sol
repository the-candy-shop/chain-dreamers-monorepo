// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../interfaces/IChainRunnersBaseRenderer.sol";

/*  @title Chain Runners constants
    @author Clement Walter
    @notice This contracts is used to retrieve constants used by the Chain Runners that are not exposed
            by the Chain Runners contracts.
*/
contract ChainRunnersConstants {
    uint16[][13][3] public WEIGHTS;
    uint8 public constant NUM_LAYERS = 13;
    uint16 public constant NUM_RUNNERS = 10_000;
    IChainRunnersBaseRenderer chainRunnersBaseRenderer;

    constructor(address _rendererAddress) {
        chainRunnersBaseRenderer = IChainRunnersBaseRenderer(_rendererAddress);

        WEIGHTS[0][0] = [
            36,
            225,
            225,
            225,
            360,
            135,
            27,
            360,
            315,
            315,
            315,
            315,
            225,
            180,
            225,
            180,
            360,
            180,
            45,
            360,
            360,
            360,
            27,
            36,
            360,
            45,
            180,
            360,
            225,
            360,
            225,
            225,
            360,
            180,
            45,
            360,
            18,
            225,
            225,
            225,
            225,
            180,
            225,
            361
        ];
        WEIGHTS[0][1] = [
            875,
            1269,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            17,
            8,
            41
        ];
        WEIGHTS[0][2] = [
            303,
            303,
            303,
            303,
            151,
            30,
            0,
            0,
            151,
            151,
            151,
            151,
            30,
            303,
            151,
            30,
            303,
            303,
            303,
            303,
            303,
            303,
            30,
            151,
            303,
            303,
            303,
            303,
            303,
            303,
            303,
            303,
            3066
        ];
        WEIGHTS[0][3] = [
            645,
            0,
            1290,
            322,
            645,
            645,
            645,
            967,
            322,
            967,
            645,
            967,
            967,
            973
        ];
        WEIGHTS[0][4] = [
            0,
            0,
            0,
            1250,
            1250,
            1250,
            1250,
            1250,
            1250,
            1250,
            1250
        ];
        WEIGHTS[0][5] = [
            121,
            121,
            121,
            121,
            121,
            121,
            243,
            0,
            0,
            0,
            0,
            121,
            121,
            243,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            121,
            121,
            243,
            121,
            121,
            243,
            0,
            0,
            0,
            121,
            121,
            243,
            121,
            121,
            306
        ];
        WEIGHTS[0][6] = [
            925,
            555,
            185,
            555,
            925,
            925,
            185,
            1296,
            1296,
            1296,
            1857
        ];
        WEIGHTS[0][7] = [88, 88, 88, 88, 88, 265, 442, 8853];
        WEIGHTS[0][8] = [189, 189, 47, 18, 9, 28, 37, 9483];
        WEIGHTS[0][9] = [
            340,
            340,
            340,
            340,
            340,
            340,
            34,
            340,
            340,
            340,
            340,
            170,
            170,
            170,
            102,
            238,
            238,
            238,
            272,
            340,
            340,
            340,
            272,
            238,
            238,
            238,
            238,
            170,
            34,
            340,
            340,
            136,
            340,
            340,
            340,
            340,
            344
        ];
        WEIGHTS[0][10] = [
            159,
            212,
            106,
            53,
            26,
            159,
            53,
            265,
            53,
            212,
            159,
            265,
            53,
            265,
            265,
            212,
            53,
            159,
            239,
            53,
            106,
            5,
            106,
            53,
            212,
            212,
            106,
            159,
            212,
            265,
            212,
            265,
            5066
        ];
        WEIGHTS[0][11] = [
            139,
            278,
            278,
            250,
            250,
            194,
            222,
            278,
            278,
            194,
            222,
            83,
            222,
            278,
            139,
            139,
            27,
            278,
            278,
            278,
            278,
            27,
            278,
            139,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            27,
            139,
            139,
            139,
            139,
            0,
            278,
            194,
            83,
            83,
            278,
            83,
            27,
            306
        ];
        WEIGHTS[0][12] = [981, 2945, 654, 16, 981, 327, 654, 163, 3279];

        // Skull
        WEIGHTS[1][0] = [
            36,
            225,
            225,
            225,
            360,
            135,
            27,
            360,
            315,
            315,
            315,
            315,
            225,
            180,
            225,
            180,
            360,
            180,
            45,
            360,
            360,
            360,
            27,
            36,
            360,
            45,
            180,
            360,
            225,
            360,
            225,
            225,
            360,
            180,
            45,
            360,
            18,
            225,
            225,
            225,
            225,
            180,
            225,
            361
        ];
        WEIGHTS[1][1] = [
            875,
            1269,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            17,
            8,
            41
        ];
        WEIGHTS[1][2] = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            10000
        ];
        WEIGHTS[1][3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        WEIGHTS[1][4] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        WEIGHTS[1][5] = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            384,
            7692,
            1923,
            0,
            0,
            0,
            0,
            0,
            1
        ];
        WEIGHTS[1][6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10000];
        WEIGHTS[1][7] = [0, 0, 0, 0, 0, 909, 0, 9091];
        WEIGHTS[1][8] = [0, 0, 0, 0, 0, 0, 0, 10000];
        WEIGHTS[1][9] = [
            526,
            526,
            526,
            0,
            0,
            0,
            0,
            0,
            526,
            0,
            0,
            0,
            526,
            0,
            526,
            0,
            0,
            0,
            526,
            526,
            526,
            526,
            526,
            526,
            526,
            526,
            526,
            526,
            526,
            0,
            0,
            526,
            0,
            0,
            0,
            0,
            532
        ];
        WEIGHTS[1][10] = [
            80,
            0,
            400,
            240,
            80,
            0,
            240,
            0,
            0,
            80,
            80,
            80,
            0,
            0,
            0,
            0,
            80,
            80,
            0,
            0,
            80,
            80,
            0,
            80,
            80,
            80,
            80,
            80,
            0,
            0,
            0,
            0,
            8000
        ];
        WEIGHTS[1][11] = [
            289,
            0,
            0,
            0,
            0,
            404,
            462,
            578,
            578,
            0,
            462,
            173,
            462,
            578,
            0,
            0,
            57,
            0,
            57,
            0,
            57,
            57,
            578,
            289,
            578,
            57,
            0,
            57,
            57,
            57,
            578,
            578,
            0,
            0,
            0,
            0,
            0,
            0,
            57,
            289,
            578,
            0,
            0,
            0,
            231,
            57,
            0,
            0,
            1745
        ];
        WEIGHTS[1][12] = [714, 714, 714, 0, 714, 0, 0, 0, 7144];

        // Bot
        WEIGHTS[2][0] = [
            36,
            225,
            225,
            225,
            360,
            135,
            27,
            360,
            315,
            315,
            315,
            315,
            225,
            180,
            225,
            180,
            360,
            180,
            45,
            360,
            360,
            360,
            27,
            36,
            360,
            45,
            180,
            360,
            225,
            360,
            225,
            225,
            360,
            180,
            45,
            360,
            18,
            225,
            225,
            225,
            225,
            180,
            225,
            361
        ];
        WEIGHTS[2][1] = [
            875,
            1269,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            779,
            17,
            8,
            41
        ];
        WEIGHTS[2][2] = [
            303,
            303,
            303,
            303,
            151,
            30,
            0,
            0,
            151,
            151,
            151,
            151,
            30,
            303,
            151,
            30,
            303,
            303,
            303,
            303,
            303,
            303,
            30,
            151,
            303,
            303,
            303,
            303,
            303,
            303,
            303,
            303,
            3066
        ];
        WEIGHTS[2][3] = [
            645,
            0,
            1290,
            322,
            645,
            645,
            645,
            967,
            322,
            967,
            645,
            967,
            967,
            973
        ];
        WEIGHTS[2][4] = [2500, 2500, 2500, 0, 0, 0, 0, 0, 0, 2500, 0];
        WEIGHTS[2][5] = [
            0,
            0,
            0,
            0,
            0,
            0,
            588,
            588,
            588,
            588,
            588,
            0,
            0,
            588,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            588,
            588,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            588,
            0,
            0,
            4
        ];
        WEIGHTS[2][6] = [
            925,
            555,
            185,
            555,
            925,
            925,
            185,
            1296,
            1296,
            1296,
            1857
        ];
        WEIGHTS[2][7] = [88, 88, 88, 88, 88, 265, 442, 8853];
        WEIGHTS[2][8] = [183, 274, 274, 18, 18, 27, 36, 9170];
        WEIGHTS[2][9] = [
            340,
            340,
            340,
            340,
            340,
            340,
            34,
            340,
            340,
            340,
            340,
            170,
            170,
            170,
            102,
            238,
            238,
            238,
            272,
            340,
            340,
            340,
            272,
            238,
            238,
            238,
            238,
            170,
            34,
            340,
            340,
            136,
            340,
            340,
            340,
            340,
            344
        ];
        WEIGHTS[2][10] = [
            217,
            362,
            217,
            144,
            72,
            289,
            144,
            362,
            72,
            289,
            217,
            362,
            72,
            362,
            362,
            289,
            0,
            217,
            0,
            72,
            144,
            7,
            217,
            72,
            217,
            217,
            289,
            217,
            289,
            362,
            217,
            362,
            3269
        ];
        WEIGHTS[2][11] = [
            139,
            278,
            278,
            250,
            250,
            194,
            222,
            278,
            278,
            194,
            222,
            83,
            222,
            278,
            139,
            139,
            27,
            278,
            278,
            278,
            278,
            27,
            278,
            139,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            278,
            27,
            139,
            139,
            139,
            139,
            0,
            278,
            194,
            83,
            83,
            278,
            83,
            27,
            306
        ];
        WEIGHTS[2][12] = [981, 2945, 654, 16, 981, 327, 654, 163, 3279];
    }

    function splitNumber(uint256 _number)
        public
        pure
        returns (uint16[NUM_LAYERS] memory numbers)
    {
        for (uint256 i = 0; i < numbers.length; i++) {
            numbers[i] = uint16(_number % NUM_RUNNERS);
            _number >>= 14;
        }
        return numbers;
    }
}
