// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { loadPalettesEncoded, TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { BigNumber } = ethers;
  const { execute } = deployments;

  const { deployer } = await getNamedAccounts();
  await deployments.get("DreamersRenderer");

  const palettesEncoded = loadPalettesEncoded();

  let gas = BigNumber.from(0);
  let tx = await execute(
    "DreamersRenderer",
    {
      from: deployer,
      log: true,
    },
    "setFillPalette",
    palettesEncoded.fillBytes
  );
  gas = gas.add(BigNumber.from(tx.gasUsed));

  tx = await execute(
    "DreamersRenderer",
    {
      from: deployer,
      log: true,
    },
    "setDPalette",
    palettesEncoded.dBytes
  );
  gas = gas.add(BigNumber.from(tx.gasUsed));

  tx = await execute(
    "DreamersRenderer",
    {
      from: deployer,
      log: true,
    },
    "setDPaletteIndex",
    palettesEncoded.dBytesIndexes
  );
  gas = gas.add(BigNumber.from(tx.gasUsed));

  tx = await execute(
    "DreamersRenderer",
    {
      from: deployer,
      log: true,
    },
    "setTraitPalette",
    palettesEncoded.traitBytes
  );
  gas = gas.add(BigNumber.from(tx.gasUsed));

  tx = await execute(
    "DreamersRenderer",
    {
      from: deployer,
      log: true,
    },
    "setTraitPaletteIndex",
    palettesEncoded.traitBytesIndexes
  );
  gas = gas.add(BigNumber.from(tx.gasUsed));

  tx = await execute(
    "DreamersRenderer",
    {
      from: deployer,
      log: true,
    },
    "setLayerIndexes",
    palettesEncoded.layerIndexes
  );
  gas = gas.add(BigNumber.from(tx.gasUsed));
  console.log(`Total gas used: ${gas.toString()}`);
};

export default func;
func.tags = [TAGS.DREAMERS_PALETTES];
func.dependencies = [TAGS.DREAMERS_RENDERER];
