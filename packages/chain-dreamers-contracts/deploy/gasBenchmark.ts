// noinspection JSUnusedGlobalSymbols

import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { TAGS } from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("GasBenchmark", {
    from: deployer,
    log: true,
  });

  const GasBenchmark = await ethers.getContract("GasBenchmark");
  let gas = await GasBenchmark.estimateGas.loopPush([1, 2, 3, 4, 5]);
  console.log("loopPush: ", gas.toString());
  gas = await GasBenchmark.estimateGas.concatPush(
    ethers.utils.hexlify([1, 2, 3, 4, 5])
  );
  console.log("concatPush: ", gas.toString());
  gas = await GasBenchmark.estimateGas.abiEncodePush(
    ethers.utils.hexlify([1, 2, 3, 4, 5])
  );
  console.log("abiEncodePush: ", gas.toString());
  gas = await GasBenchmark.estimateGas.loopConcatPush([
    ethers.utils.hexlify([1]),
    ethers.utils.hexlify([2]),
    ethers.utils.hexlify([3]),
    ethers.utils.hexlify([4]),
    ethers.utils.hexlify([5]),
  ]);
  console.log("loopConcatPush: ", gas.toString());
  gas = await GasBenchmark.estimateGas.concatBytes2("0x0000");
  console.log("concatBytes2: ", gas.toString());
};

export default func;
func.tags = [TAGS.GAS_BENCHMARK];
