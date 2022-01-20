// noinspection JSUnusedGlobalSymbols

import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";
import {TAGS} from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, execute} = deployments;

    const {deployer} = await getNamedAccounts();
    const tx = await deploy("ChainRunnersBaseRenderer", {
        from: deployer,
        log: true,
    });
    await deploy("ChainRunners", {
        from: deployer,
        log: true,
    });
    await execute("ChainRunners", {
        from: deployer,
        log: true,
    }, "setRenderingContractAddress", tx.address);
};

export default func;
func.tags = [TAGS.CHAIN_RUNNERS];
