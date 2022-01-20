import {task} from "hardhat/config";

task("mint-runner", "Mint a Chain Runner")
    .addParam("runnerId", "The runner Id")
    .setAction(async ({runnerId}, { deployments, getNamedAccounts, getUnnamedAccounts}) => {
        const users = await getUnnamedAccounts();
        const { deployer } = await getNamedAccounts();
        const {execute} = deployments;

        await execute("ChainRunners", {
            from: deployer,
            log: true,
        }, "mint", parseInt(runnerId),)
    });
