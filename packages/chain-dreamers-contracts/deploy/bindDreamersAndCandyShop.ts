// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { execute } = deployments;

  const ChainDreamers = await deployments.get("ChainDreamers");
  const CandyShop = await deployments.get("CandyShop");
  const { deployer } = await getNamedAccounts();

  await execute(
    "CandyShop",
    { from: deployer },
    "setChainDreamersAddress",
    ChainDreamers.address
  );
  await execute(
    "ChainDreamers",
    { from: deployer },
    "setCandyShopAddress",
    CandyShop.address
  );
};

export default func;
func.tags = [TAGS.BIND_DREAMERS_AND_CANDY_SHOP];
func.dependencies = [TAGS.CHAIN_DREAMERS, TAGS.CANDY_SHOP];
