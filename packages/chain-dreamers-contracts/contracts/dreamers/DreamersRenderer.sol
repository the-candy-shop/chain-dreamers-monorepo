// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@0xsequence/sstore2/contracts/SSTORE2.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {Integers} from "../lib/Integers.sol";
import "./ChainRunnersConstants.sol";
import "../runners/IChainRunners.sol";

/*  @title Dreamers Renderer
    @author Clement Walter
    @dev Leverage the d attributes of svg <path> to encode a palette of base traits. Each runner trait
         is encoded as a combination of these base traits. More precisely, the Dreamers encoding scheme works as follows:
         - each one of the 330 traits is encoded as a list of <path />
         - each path combines a `d` and a `fill`
         - the storage contains the all the possible `d` and all the possible `fill`
         - each trait is then an ordered list of tuples (index of d, index of fill)
         - each dreamer is a list a trait and consequently still an ordered list of (index of d, index of fill)
*/
contract DreamersRenderer is Ownable, ReentrancyGuard, ChainRunnersConstants {
    using Integers for uint8;

    // We have a total of 3 bytes = 24 bits per Path
    uint8 public constant BITS_PER_D_INDEX = 12;
    uint8 public constant BITS_PER_FILL_INDEX = 12;

    // Each D is encoded with a sequence of 2 bits for each letter (M, L, Q, C) and 1 byte per attribute. Since each
    // letter does not have the same number of attributes, this number if stored as constant below as well.
    uint8 public constant BITS_PER_D_ATTRIBUTE = 3;
    bytes8 public constant D_ATTRIBUTE_PALETTE = hex"4d4c51434148565a"; // M L Q C A H V Z
    bytes8 public constant D_ATTRIBUTE_PARAMETERS_COUNT = hex"0202040607010100"; // 2 2 4 6 7 1 1 0
    bytes3 public constant NONE_COLOR = hex"000001";
    bytes public constant PATH_TAG_START = bytes("<path d='");
    bytes public constant FILL_TAG = bytes("' fill='");
    bytes public constant STROKE_TAG = bytes("' stroke='");
    bytes public constant PATH_TAG_END = bytes("' />");
    bytes1 public constant HASHTAG = hex"23";
    bytes public constant SVG_TAG_START =
        bytes(
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 255 255' width='500px' height='500px'>"
        );
    bytes public constant SVG_TAG_END =
        bytes("<style>path{stroke-width:0.71}</style></svg>");

    address public fillPalette;
    address[] public dPalette;
    address public dPaletteIndexes;
    address public traitPalette;
    address public traitPaletteIndexes;
    bytes layerIndexes;
    IChainRunners runnersToken;

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////  Rendering mechanics  /////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    /// @dev Colors are concatenated and stored in a single 'bytes' with SSTORE2 to save gas.
    function setFillPalette(bytes calldata _fillPalette) external onlyOwner {
        fillPalette = SSTORE2.write(_fillPalette);
    }

    /// @dev Only the d parameter is encoded for each path. All the paths are concatenated together to save gas.
    ///      The dPaletteIndexes is used to retrieve the path from the dPalette.
    function setDPalette(bytes[] calldata _pathPalette) external onlyOwner {
        for (uint8 i = 0; i < _pathPalette.length; i++) {
            dPalette.push(SSTORE2.write(_pathPalette[i]));
        }
    }

    /// @dev Since each SSTORE2 slots can contain up to 24kb, indexes need to be uint16, ie. two bytes per index.
    function setDPaletteIndex(bytes calldata _pathPaletteIndex)
        external
        onlyOwner
    {
        dPaletteIndexes = SSTORE2.write(_pathPaletteIndex);
    }

    /// @dev The traits are stored as a list of tuples (d index, fill index). For our case, 12 bits per index is
    ///      enough as 2^12 = 4096 is greater than total number of d and total number of fill to date.
    ///      This could be changed if needed.
    ///      Hence a trait is a sequence of several 3 bytes long (d index, fill index).
    function setTraitPalette(bytes calldata _traitPalette) external onlyOwner {
        traitPalette = SSTORE2.write(_traitPalette);
    }

    /// @dev Since each SSTORE2 slots can contain up to 24kb, indexes need to be uint16, ie. two bytes per index.
    ///      A trait can then be retrieved with traitPalette[traitPaletteIndexes[i]: traitPaletteIndexes[i+1]]
    function setTraitPaletteIndex(bytes calldata _traitPaletteIndex)
        external
        onlyOwner
    {
        traitPaletteIndexes = SSTORE2.write(_traitPaletteIndex);
    }

    /// @dev The trait indexes allow to map from the Chain Runners 2D indexation (trait index, layer index) to the
    ///      current 1D indexation (trait index).
    function setLayerIndexes(bytes calldata _layerIndexes) external onlyOwner {
        layerIndexes = _layerIndexes;
    }

    /// @dev This function will be the pendant of the ChainRunnersBaseRenderer.getLayer ones.
    function getTraitIndex(uint16 _layerIndex, uint16 _itemIndex)
        public
        view
        returns (uint16)
    {
        uint16 traitIndex = Integers.load16(
            layerIndexes[_layerIndex * 2],
            layerIndexes[_layerIndex * 2 + 1]
        );
        uint16 nextTraitIndex = Integers.load16(
            layerIndexes[_layerIndex * 2 + 2],
            layerIndexes[_layerIndex * 2 + 3]
        );
        if (traitIndex + _itemIndex >= nextTraitIndex) {
            return type(uint16).max;
        }

        return traitIndex + _itemIndex;
    }

    /// @dev 3 bytes per color because svg does not handle alpha.
    function getFill(uint16 _index) public view returns (string memory) {
        // TODO: use assembly instead
        bytes memory palette = SSTORE2.read(fillPalette);
        bytes memory color = bytes.concat(
            palette[(_index * 3)],
            palette[(_index * 3) + 1],
            palette[(_index * 3) + 2]
        );

        if (
            color[0] == NONE_COLOR[0] &&
            color[1] == NONE_COLOR[1] &&
            color[2] == NONE_COLOR[2]
        ) {
            return "none";
        }

        return
            string(
                bytes.concat(
                    HASHTAG,
                    bytes(uint8(palette[3 * _index]).toString(16, 2)),
                    bytes(uint8(palette[3 * _index + 1]).toString(16, 2)),
                    bytes(uint8(palette[3 * _index + 2]).toString(16, 2))
                )
            );
    }

    /// @dev Get the start and end indexes of the bytes concerning the given d in the dPalette storage.
    function getDIndex(uint16 _index) public view returns (uint32, uint32) {
        // TODO: use assembly instead
        bytes memory _indexes = SSTORE2.read(dPaletteIndexes);
        uint32 start = uint32(
            Integers.load16(_indexes[_index * 2], _indexes[_index * 2 + 1])
        );
        uint32 next = uint32(
            Integers.load16(_indexes[_index * 2 + 2], _indexes[_index * 2 + 3])
        );
        // Magic reasonable number to deal with overflow
        if (uint32(_index) > 1000 && start < 20000) {
            start = uint32(type(uint16).max) + 1 + start;
        }
        if (uint32(_index) > 2000 && start < 40000) {
            start = uint32(type(uint16).max) + 1 + start;
        }
        if (uint32(_index) > 1000 && next < 20000) {
            next = uint32(type(uint16).max) + 1 + next;
        }
        if (uint32(_index) > 2000 && next < 40000) {
            next = uint32(type(uint16).max) + 1 + next;
        }
        return (start, next);
    }

    /// @dev Retrieve the bytes for the given d from the dPalette storage. The bytes may be split into several SSTORE2
    ///      slots.
    function getDBytes(uint16 _index) public view returns (bytes memory) {
        // TODO: use assembly instead
        (uint32 dIndex, uint32 dIndexNext) = getDIndex(_index);
        uint256 storageIndex = 0;
        bytes memory _dPalette = SSTORE2.read(dPalette[storageIndex]);
        uint256 cumSumBytes = _dPalette.length;
        uint256 pos = dIndex;
        while (dIndex >= cumSumBytes) {
            pos -= _dPalette.length;
            storageIndex++;
            _dPalette = SSTORE2.read(dPalette[storageIndex]);
            cumSumBytes += _dPalette.length;
        }
        bytes memory _d = new bytes(dIndexNext - dIndex);
        for (uint256 i = 0; i < _d.length; i++) {
            if (pos >= _dPalette.length) {
                storageIndex++;
                _dPalette = SSTORE2.read(dPalette[storageIndex]);
                pos = 0;
            }
            _d[i] = _dPalette[pos];
            pos++;
        }
        return _d;
    }

    /// @dev Decodes the path and returns it as a plain string to be used in the svg path attribute.
    function getD(bytes memory dEncodedBytes)
        public
        pure
        returns (string memory)
    {
        bytes memory d;
        bytes memory bytesBuffer;
        uint32 bitsShift = 0;
        uint16 byteIndex = 0;
        uint8 bitShiftRemainder = 0;
        uint8 dAttributeIndex;
        uint8 dAttributeParameterCount;
        while (
            bitsShift <= dEncodedBytes.length * 8 - (BITS_PER_D_ATTRIBUTE + 8) // at least BITS_PER_D_ATTRIBUTE bits for the d attribute index and 1 byte for the d attribute parameter count
        ) {
            byteIndex = uint16(bitsShift / 8);
            bitShiftRemainder = uint8(bitsShift % 8);

            dAttributeIndex =
                uint8(
                    (dEncodedBytes[byteIndex] << bitShiftRemainder) |
                        (dEncodedBytes[byteIndex + 1] >>
                            (8 - bitShiftRemainder))
                ) >>
                (8 - BITS_PER_D_ATTRIBUTE);

            dAttributeParameterCount = uint8(
                D_ATTRIBUTE_PARAMETERS_COUNT[dAttributeIndex]
            );
            d = bytes.concat(d, D_ATTRIBUTE_PALETTE[dAttributeIndex]);

            bitsShift += BITS_PER_D_ATTRIBUTE;
            byteIndex = uint16(bitsShift / 8);
            bitShiftRemainder = uint8(bitsShift % 8);
            bytesBuffer = new bytes(dAttributeParameterCount);
            // TODO: use assembly instead
            for (uint8 i = 0; i < dAttributeParameterCount; i++) {
                bytesBuffer[i] =
                    dEncodedBytes[byteIndex + i] <<
                    bitShiftRemainder;
                if (byteIndex + i + 1 < dEncodedBytes.length) {
                    bytesBuffer[i] |=
                        dEncodedBytes[byteIndex + i + 1] >>
                        (8 - bitShiftRemainder);
                }
            }

            for (uint8 i = 0; i < dAttributeParameterCount; i++) {
                d = bytes.concat(
                    d,
                    hex"20", // space
                    bytes(uint8(bytesBuffer[i]).toString())
                );
            }
            bitsShift += 8 * dAttributeParameterCount;
        }
        return string(d);
    }

    /// @dev Each trait is a list of tuples (d, fill) where d is the d attribute and fill is the color of the trait.
    function getTrait(uint16 _index) public view returns (uint16[2][] memory) {
        bytes memory _traitPaletteIndexes = SSTORE2.read(traitPaletteIndexes);
        uint16 start = Integers.load16(
            _traitPaletteIndexes[_index * 2],
            _traitPaletteIndexes[_index * 2 + 1]
        );
        uint16 next = Integers.load16(
            _traitPaletteIndexes[_index * 2 + 2],
            _traitPaletteIndexes[_index * 2 + 3]
        );
        bytes memory _traitPalette = SSTORE2.read(traitPalette);
        uint16 count = next - start;
        uint16[2][] memory trait = new uint16[2][](count / 3);
        for (uint16 i = start; i < next; i += 3) {
            (uint16 dIndex, uint16 fillIndex) = Integers.load12x2(
                _traitPalette[i],
                _traitPalette[i + 1],
                _traitPalette[i + 2]
            );
            trait[(i - start) / 3][0] = dIndex;
            trait[(i - start) / 3][1] = fillIndex;
        }
        return trait;
    }

    /// @dev Each trait is the bytes representation of the final svg string concatenating several <path> elements.
    function getSvg(uint16[2][] memory traits)
        public
        view
        returns (string memory)
    {
        bytes memory svg = SVG_TAG_START;
        for (uint16 i = 0; i < traits.length; i++) {
            svg = bytes.concat(
                svg,
                PATH_TAG_START,
                bytes(getD(getDBytes(traits[i][0]))),
                FILL_TAG,
                bytes(getFill(traits[i][1])),
                PATH_TAG_END
            );
        }
        return string(bytes.concat(svg, SVG_TAG_END));
    }

    ////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////  Dreamers  ///////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    constructor(address _rendererAddress, address _runnersTokenAddress)
        ChainRunnersConstants(_rendererAddress)
    {
        runnersToken = IChainRunners(_runnersTokenAddress);
    }

    /// @dev Somehow copied from the original code but returns an array of trait indexes instead of Layer structs.
    ///      Flags for no layer is also updated from empty `Layer` to index = type(uint16).max.
    function getTokenData(uint256 _dna)
        public
        view
        returns (uint16[NUM_LAYERS] memory traitIndexes)
    {
        uint16[NUM_LAYERS] memory dna = splitNumber(_dna);
        uint16 raceIndex = chainRunnersBaseRenderer.getRaceIndex(dna[1]);
        bool hasFaceAcc = dna[7] < (NUM_RUNNERS - WEIGHTS[raceIndex][7][7]);
        bool hasMask = dna[8] < (NUM_RUNNERS - WEIGHTS[raceIndex][8][7]);
        bool hasHeadBelow = dna[9] < (NUM_RUNNERS - WEIGHTS[raceIndex][9][36]);
        bool hasHeadAbove = dna[11] <
            (NUM_RUNNERS - WEIGHTS[raceIndex][11][48]);
        bool useHeadAbove = (dna[0] % 2) > 0;
        for (uint8 i = 0; i < NUM_LAYERS; i++) {
            uint8 layerTraitIndex = chainRunnersBaseRenderer.getLayerIndex(
                dna[i],
                i,
                raceIndex
            );
            uint16 traitIndex = getTraitIndex(i, layerTraitIndex);
            /*
            These conditions help make sure layer selection meshes well visually.
            1. If mask, no face/eye acc/mouth acc
            2. If face acc, no mask/mouth acc/face
            3. If both head above & head below, randomly choose one
            */
            bool consistencyCheck = (((i == 2 || i == 12) &&
                !hasMask &&
                !hasFaceAcc) ||
                (i == 7 && !hasMask) ||
                (i == 10 && !hasMask) ||
                (i < 2 || (i > 2 && i < 7) || i == 8 || i == 9 || i == 11));
            bool noHeadCheck = ((hasHeadBelow &&
                hasHeadAbove &&
                (i == 9 && useHeadAbove)) || (i == 11 && !useHeadAbove));
            bool isRealTrait = traitIndex < type(uint16).max;
            if (!isRealTrait || !consistencyCheck || noHeadCheck) {
                traitIndex = type(uint16).max;
            }
            traitIndexes[i] = traitIndex;
        }
        return traitIndexes;
    }

    function getSvg(uint256 tokenId) external view returns (string memory) {
        bytes memory svg = SVG_TAG_START;

        uint256 dna = runnersToken.getDna(tokenId);
        uint16[NUM_LAYERS] memory traitIndexes = getTokenData(dna);
        for (uint8 i = 0; i < NUM_LAYERS; i++) {
            if (traitIndexes[i] < type(uint16).max) {
                // A trait is both one of the original design and on of its path components.
                // Hence a trait is a sum of traits.
                uint16[2][] memory traits = getTrait(traitIndexes[i]);
                for (uint256 j = 0; j < traits.length; j++) {
                    uint16 fillIndex = traits[j][1];
                    bool strokeFlag = (traits[j][1] % 2) > 0;
                    fillIndex = fillIndex >> 1;
                    svg = bytes.concat(
                        svg,
                        PATH_TAG_START,
                        bytes(getD(getDBytes(traits[j][0]))),
                        FILL_TAG,
                        bytes(getFill(fillIndex))
                    );
                    if (strokeFlag) {
                        svg = bytes.concat(svg, STROKE_TAG, bytes("#000"));
                    }
                    svg = bytes.concat(svg, PATH_TAG_END);
                }
            }
            svg = bytes.concat(
                svg,
                bytes.concat(
                    bytes("<!--  End of layer "),
                    bytes(i.toString()),
                    bytes(" -->")
                )
            );
        }

        return string(bytes.concat(svg, SVG_TAG_END));
    }
}
