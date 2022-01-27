import { task } from "hardhat/config";

task("mint-batch-runners-access", "Mint a Chain Dreamer during chapter 1")
  .addParam("tokenId", "The token id")
  .setAction(async ({ tokenId }, { deployments, getNamedAccounts, ethers }) => {
    const { deployer } = await getNamedAccounts();
    const { execute } = deployments;

    await execute("ChainRunners", { from: deployer }, "mint", tokenId);
    await execute(
      "CandyShop",
      { from: deployer, value: ethers.utils.parseEther("0.05") },
      "mint",
      0,
      1
    );
    await execute(
      "ChainDreamers",
      {
        from: deployer,
        log: true,
      },
      "mintBatchRunnersAccess",
      "0x" + ("0000" + tokenId.toString(16)).slice(-4),
      "0x0000",
      "0x00",
      [0],
      [1]
    );
  });
