// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./ChainRunnersBaseRenderer.sol";

contract ChainRunnersLayerRenderer is ChainRunnersBaseRenderer {
    function traitSVG(uint8 layerIndex, uint8 itemIndex)
        public
        view
        returns (string memory)
    {
        Layer[NUM_LAYERS] memory tokenLayers;
        Color[NUM_COLORS][NUM_LAYERS] memory tokenPalettes;
        Layer memory layer = getLayer(layerIndex, itemIndex);

        tokenLayers[0] = layer;
        tokenPalettes[0] = palette(tokenLayers[0].hexString);
        string[4] memory buffer256 = tokenSVGBuffer(
            tokenLayers,
            tokenPalettes,
            1
        );
        return
            string(
                abi.encodePacked(
                    "PHN2ZyB2ZXJzaW9uPScxLjEnIHZpZXdCb3g9JzAgMCAzMjAgMzIwJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHNoYXBlLXJlbmRlcmluZz0nY3Jpc3BFZGdlcycgaGVpZ2h0PScxMDAlJyB3aWR0aD0nMTAwJSc+",
                    buffer256[0],
                    buffer256[1],
                    buffer256[2],
                    buffer256[3],
                    "PHN0eWxlPnJlY3R7d2lkdGg6MTBweDtoZWlnaHQ6MTBweDt9PC9zdHlsZT48L3N2Zz4="
                )
            );
    }
}
