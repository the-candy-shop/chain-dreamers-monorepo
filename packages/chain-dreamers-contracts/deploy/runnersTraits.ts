// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import fs from "fs";
import { Layers } from "../utils/types";
import { TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (!hre.network.tags.local) {
    return;
  }
  const { deployments, getNamedAccounts } = hre;
  const { execute } = deployments;

  const { deployer } = await getNamedAccounts();
  const layers = (
    JSON.parse(
      fs.readFileSync("assets/runners-layers.json", { encoding: "utf-8" })
    ) as Layers
  ).map((layer) => {
    return {
      name: layer.itemName,
      hexString: layer.hexString,
      layerIndex: layer.layerIndex,
      itemIndex: layer.itemIndex,
    };
  });

  await execute(
    "ChainRunnersLayerRenderer",
    { from: deployer, log: true },
    "setLayers((string,bytes,uint8,uint8)[])",
    layers
  );
};

export default func;

func.tags = [TAGS.CHAIN_RUNNERS_TRAITS];
func.dependencies = [TAGS.CHAIN_RUNNERS];
