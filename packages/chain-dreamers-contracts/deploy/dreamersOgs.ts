// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { TAGS } from "../utils/constants";
import fs from "fs";
import { OG } from "../utils/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const ogsData: OG[] = JSON.parse(fs.readFileSync("assets/ogs.json", "utf8"));
  const ogs = ogsData.map((og) => og.owner);
  const tokenIds = ogsData.map((og) => og.tokenId);
  const candies = ogsData.map((og) => og.candy);

  await execute(
    "ChainDreamers",
    { from: deployer, log: true },
    "setOgs",
    ogs.slice(0, 200),
    tokenIds.slice(0, 200),
    candies.slice(0, 200)
  );
  await execute(
    "ChainDreamers",
    { from: deployer, log: true },
    "setOgs",
    ogs.slice(200, 400),
    tokenIds.slice(200, 400),
    candies.slice(200, 400)
  );
  await execute(
    "ChainDreamers",
    { from: deployer, log: true },
    "setOgs",
    ogs.slice(400),
    tokenIds.slice(400),
    candies.slice(400)
  );
};
export default func;
func.tags = [TAGS.CHAIN_DREAMERS_OGS];
func.dependencies = [TAGS.CHAIN_DREAMERS];
