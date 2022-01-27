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
  if (network.tags.staging) {
    const ChainRunners = await deployments.get("ChainRunners");
    runnersAddress = ChainRunners.address;
    const ChainRunnersLayerRenderer = await deployments.get(
      "ChainRunnersLayerRenderer"
    );
    rendererAddress = ChainRunnersLayerRenderer.address;
  }

  const tx = await deploy("DreamersRenderer", {
    from: deployer,
    log: true,
    args: [rendererAddress, runnersAddress],
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
