// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, execute } = deployments;

  const { deployer } = await getNamedAccounts();
  await deploy("CandyShop", {
    from: deployer,
    log: true,
    args: ["https://api.chaindreamers.xyz/test/candy/tokens/{id}/metadata"],
  });

  if (network.tags.mainnet) {
    await execute(
      "CandyShop",
      {
        from: deployer,
        log: true,
      },
      "pause"
    );
  }
};

export default func;
func.tags = [TAGS.CANDY_SHOP];
