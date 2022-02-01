import { task } from "hardhat/config";

task("mint-batch-runners-access", "Mint a Chain Dreamer during chapter 1")
  .addParam("tokenId", "The token id")
  .setAction(async ({ tokenId }, { deployments, getNamedAccounts, ethers }) => {
    const { deployer } = await getNamedAccounts();
    const { execute, read } = deployments;

    tokenId = parseInt(tokenId);
    try {
      await execute("ChainRunners", { from: deployer }, "mint", tokenId);
    } catch (e) {
      console.log("Runner already minted");
    }
    const paused = await read("CandyShop", "paused");
    console.log(`CandyShop ${paused ? "paused" : "open"}`);
    if (paused) {
      console.log(`CandyShop paused, opening...`);
      await execute("CandyShop", { from: deployer }, "unpause");
      console.log(`CandyShop paused, open`);
    }
    await execute(
      "CandyShop",
      { from: deployer, value: ethers.utils.parseEther("0.03") },
      "mint",
      0,
      1
    );
    console.log("Minted 1 candy");
    await execute(
      "ChainDreamers",
      {
        from: deployer,
        log: true,
      },
      "mintBatchRunnersAccess",
      "0x" + ("0000" + tokenId.toString(16)).slice(-4),
      [0],
      [1]
    );
  });
