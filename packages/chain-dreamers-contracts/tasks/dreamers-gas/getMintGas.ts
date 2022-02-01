import { task } from "hardhat/config";
import { uint16ToBytes } from "../../utils/dreamers";
import fs from "fs";
import { SingleBar } from "cli-progress";

task("get-mint-gas", "Estimate the gas used to mint Dreamers").setAction(
  async ({}, { ethers, getNamedAccounts, network, deployments }) => {
    const { execute } = deployments;
    const { deployer } = await getNamedAccounts();
    const ChainDreamers = await ethers.getContract("ChainDreamers");
    ChainDreamers.connect(deployer);
    const CandyShop = await ethers.getContract("CandyShop");
    CandyShop.connect(deployer);

    let gas;
    // Chapter 1
    const maxRunnersPerWallet = 100;
    for (let i = 0; i < maxRunnersPerWallet; i++) {
      try {
        await execute("ChainRunners", { from: deployer }, "mint", i);
      } catch (e) {}
    }
    console.log("Runners minted");
    const paused = await CandyShop.paused();
    if (paused) {
      await CandyShop.unpause();
    }
    await CandyShop.mintBatch([0], [maxRunnersPerWallet], {
      value: ethers.utils.parseEther(
        (maxRunnersPerWallet * 0.03).toFixed(2).toString()
      ),
    });
    console.log("Candies bought");

    const bar = new SingleBar({});
    bar.start(maxRunnersPerWallet, 0);
    gas = await Promise.all(
      [...Array(maxRunnersPerWallet).keys()].map(async (lastTokenId) => {
        const numberOfTokens = lastTokenId + 1;
        const candyGas = await CandyShop.estimateGas.mintBatch(
          [0],
          [numberOfTokens],
          {
            value: ethers.utils.parseEther(
              (numberOfTokens * 0.03).toFixed(2).toString()
            ),
          }
        );
        const tokenIds =
          "0x" + [...Array(numberOfTokens).keys()].map(uint16ToBytes).join("");
        const candyIds = Array(numberOfTokens).fill(0);
        const candyAmounts = Array(numberOfTokens).fill(1);
        const dreamersGas =
          await ChainDreamers.estimateGas.mintBatchRunnersAccess(
            tokenIds,
            candyIds,
            candyAmounts
          );
        bar.increment(1);
        return {
          candyGas: candyGas.toNumber(),
          dreamersGas: dreamersGas.toNumber(),
        };
      })
    );
    fs.writeFileSync(
      "assets/mint-gas-chapter-1.json",
      JSON.stringify(gas, null, 2)
    );

    console.log("Chapter 1 gas estimated");

    // Chapter 2
    await execute(
      "ChainDreamers",
      { from: deployer },
      "setPublicSaleTimestamp",
      1
    );
    await network.provider.send("evm_mine");
    await network.provider.send("evm_mine");
    const maxDreamersMintPublicSale = 5;
    await execute(
      "ChainDreamers",
      {
        from: deployer,
        log: true,
      },
      "setMaxDreamersMintPublicSale",
      maxDreamersMintPublicSale
    );

    gas = await Promise.all(
      [...Array(maxDreamersMintPublicSale).keys()].map(async (lastTokenId) => {
        const numberOfTokens = lastTokenId + 1;

        const tx = await ChainDreamers.estimateGas.mintBatchPublicSale(
          "0x" + [...Array(numberOfTokens).keys()].map(uint16ToBytes).join(""),
          {
            value: ethers.utils.parseEther(
              (0.05 * numberOfTokens).toFixed(2).toString()
            ),
            from: deployer,
          }
        );
        return tx.toNumber();
      })
    );
    fs.writeFileSync(
      "assets/mint-gas-chapter-2.json",
      JSON.stringify(gas, null, 2)
    );
  }
);
