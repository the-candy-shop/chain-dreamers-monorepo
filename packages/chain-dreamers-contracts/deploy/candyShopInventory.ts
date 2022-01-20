// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { loadSkus, TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const skus = loadSkus();
  const tx = await execute(
    "CandyShop",
    {
      from: deployer,
      log: true,
    },
    "addSku",
    skus.map((sku) => ({
      ...sku,
      price: ethers.utils.parseEther(sku.price.toString()),
    }))
  );
  console.log(`Inventory gas: ${tx.gasUsed.toString()}`);
};

export default func;
func.tags = [TAGS.CANDY_SHOP_INVENTORY];
func.dependencies = [TAGS.CANDY_SHOP];
