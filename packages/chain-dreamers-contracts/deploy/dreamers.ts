// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  chainRunnersAddress,
  chainRunnersBaseRendererAddress,
  TAGS,
} from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, execute } = deployments;
  const { deployer } = await getNamedAccounts();

  // Deploy token
  await deploy("ChainDreamers", {
    from: deployer,
    log: true,
    args: ["Chain Dreamers", "DRE"],
  });

  if (network.tags.staging) {
    await execute(
      "ChainDreamers",
      { from: deployer, log: true },
      "setOpensea",
      "0xf57b2c51ded3a29e6891aba85459d600256cf317"
    );

    await execute(
      "ChainDreamers",
      { from: deployer, log: true },
      "setLooksrare",
      "0x3f65a762f15d01809cdc6b43d8849ff24949c86a"
    );
  }
  if (network.tags.mainnet) {
    await execute(
      "ChainDreamers",
      { from: deployer, log: true },
      "setOpensea",
      "0xa5409ec958c83c3f309868babaca7c86dcb077c1"
    );

    await execute(
      "ChainDreamers",
      { from: deployer, log: true },
      "setLooksrare",
      "0xf42aa99f011a1fa7cda90e5e98b277e306bca83e"
    );
  }
  // Set the ChainRunners address
  const ChainRunners = await deployments.get("ChainRunners");
  await execute(
    "ChainDreamers",
    {
      from: deployer,
      log: true,
    },
    "setChainRunnersContractAddress",
    ChainRunners.address
  );
  await execute(
    "ChainDreamers",
    {
      from: deployer,
      log: true,
    },
    "setMaxDreamersMintPublicSale",
    5
  );

  // Deploy renderer
  const Integers = await deployments.get("Integers");
  let runnersAddress = chainRunnersAddress();
  let rendererAddress = chainRunnersBaseRendererAddress();
  let baseURI = "https://api.chaindreamers.xyz/tokens/";

  if (network.tags.staging) {
    const ChainRunners = await deployments.get("ChainRunners");
    runnersAddress = ChainRunners.address;
    const ChainRunnersLayerRenderer = await deployments.get(
      "ChainRunnersLayerRenderer"
    );
    rendererAddress = ChainRunnersLayerRenderer.address;
    baseURI = "https://api.chaindreamers.xyz/staging/tokens/";
  }

  const tx = await deploy("DreamersRenderer", {
    from: deployer,
    log: true,
    args: [rendererAddress, runnersAddress, baseURI],
    libraries: { Integers: Integers.address },
  });
  await execute(
    "ChainDreamers",
    {
      from: deployer,
      log: true,
    },
    "setRenderingContractAddress",
    tx.address
  );
};

export default func;
func.tags = [TAGS.CHAIN_DREAMERS];
func.dependencies = [TAGS.INTEGERS, TAGS.CHAIN_RUNNERS];
