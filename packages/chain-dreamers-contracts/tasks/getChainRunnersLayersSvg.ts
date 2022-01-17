import { task } from "hardhat/config";
import fs from "fs";
import { decode } from "../utils/base64";
import { loadRunnersLayers, TAGS } from "../utils/constants";
import { parseInt } from "lodash";

task("get-chain-runners-layers-svg", "Export the runners traits to a JSON file")
  .addOptionalParam(
    "outputDir",
    "The output directory",
    "assets/CHAIN_RUNNERS_TRAITS"
  )
  .addOptionalParam("layerIndex", "The layer index", "")
  .addOptionalParam("itemIndex", "The item index", "")
  .setAction(async ({ layerIndex, itemIndex, outputDir }, { deployments }) => {
    await deployments.fixture(TAGS.CHAIN_RUNNERS);
    const { read } = deployments;

    const runnersLayers = loadRunnersLayers();
    const layers = runnersLayers.filter(
      (layer) =>
        (parseInt(layerIndex)
          ? layer.layerIndex === parseInt(layerIndex)
          : true) &&
        (parseInt(itemIndex) ? layer.itemIndex == parseInt(itemIndex) : true)
    );

    await Promise.all(
      layers.map(async (layer) => {
        const layerName = `${outputDir}/${layer.layerIndex}-${
          layer.itemIndex
        }-${layer.traitName.trim()}-${layer.itemName.trim()}.svg`;
        const dir = layerName.split("/").slice(0, -1).join("/");
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const layerSVG = await read(
          "ChainRunnersLayerRenderer",
          "traitSVG",
          layer.layerIndex,
          layer.itemIndex
        );
        fs.writeFileSync(layerName, decode(layerSVG), {
          encoding: "utf-8",
        });
      })
    );
  });
