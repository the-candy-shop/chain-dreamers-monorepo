// noinspection JSUnusedGlobalSymbols

import {HardhatRuntimeEnvironment} from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types";
import {chainRunnersAddress, chainRunnersBaseRendererAddress, TAGS} from "../utils/constants";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts, network} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();
    await deploy("ChainDreamers", {
        from: deployer,
        log: true,
        args: ["Chain Dreamers", "DRE"],
    });
    const Integers = await deployments.get("Integers");

    let runnersAddress = chainRunnersAddress()
    let rendererAddress = chainRunnersBaseRendererAddress()
    if (network.tags.staging) {
        const ChainRunners = await deployments.get("ChainRunners");
        runnersAddress = ChainRunners.address;
        const ChainRunnersBaseRenderer = await deployments.get("ChainRunnersBaseRenderer");
        rendererAddress = ChainRunnersBaseRenderer.address
    }

    await deploy("DreamersRenderer", {
        from: deployer,
        log: true,
        args: [rendererAddress, runnersAddress],
        libraries: {Integers: Integers.address},
    });
};

export default func;
func.tags = [TAGS.CHAIN_DREAMERS];
func.dependencies = [TAGS.INTEGERS, TAGS.CHAIN_RUNNERS];
