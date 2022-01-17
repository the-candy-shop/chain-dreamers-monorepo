// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult, Receipt } from "hardhat-deploy/types";
import fs from "fs";
import { Layers } from "../utils/types";
import { decode } from "../utils/base64";
import { TAGS } from "../utils/constants";

type DeployCost = {
  deploy: DeployResult;
  setLayers: Receipt;
};

type Renderer = {
  name: string;
  contract: string;
  traits: string;
  setLayers: string;
};

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy, execute, read } = deployments;

  const { deployer } = await getNamedAccounts();
  const renderers: Renderer[] = [
    {
      name: "Base",
      contract: "ChainRunnersLayerRenderer",
      traits: "runners-layers.json",
      setLayers: "setLayers((string,bytes,uint8,uint8)[])",
    },
  ];
  const gas: Record<string, DeployCost> = {};
  for (const renderer of renderers) {
    const deployTx = await deploy(renderer.contract, {
      from: deployer,
      log: true,
    });

    const layers = (
      JSON.parse(
        fs.readFileSync(renderer.traits, { encoding: "utf-8" })
      ) as Layers
    ).map((layer) => {
      return {
        name: layer.itemName,
        hexString: layer.hexString,
        layerIndex: layer.layerIndex,
        itemIndex: layer.itemIndex,
      };
    });

    const setLayersTx = await execute(
      renderer.contract,
      { from: deployer, log: true },
      renderer.setLayers,
      layers
    );
    gas[renderer.name] = {
      deploy: deployTx,
      setLayers: setLayersTx,
    };
  }
};
export default func;
func.tags = [TAGS.CHAIN_RUNNERS];
