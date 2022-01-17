// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  chainRunnersAddress,
  chainRunnersBaseRendererAddress,
  TAGS,
} from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const Integers = await deployments.get("Integers");
  await deploy("DreamersRenderer", {
    from: deployer,
    log: true,
    args: [chainRunnersBaseRendererAddress(), chainRunnersAddress()],
    libraries: { Integers: Integers.address },
  });
};

export default func;
func.tags = [TAGS.DREAMERS_RENDERER];
func.dependencies = [TAGS.INTEGERS];
