import { task } from "hardhat/config";
import { uint16ToBytes } from "../../utils/dreamers";
import fs from "fs";

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
    await CandyShop.mintBatch([0], [maxRunnersPerWallet], {
      value: ethers.utils.parseEther(
        (maxRunnersPerWallet * 0.05).toFixed(2).toString()
      ),
    });
    console.log("Candies bought");

    gas = await Promise.all(
      [...Array(maxRunnersPerWallet).keys()].map(async (lastTokenId) => {
        const numberOfTokens = lastTokenId + 1;
        const candyGas = await CandyShop.estimateGas.mintBatch(
          [0],
          [numberOfTokens],
          {
            value: ethers.utils.parseEther(
              (numberOfTokens * 0.05).toFixed(2).toString()
            ),
          }
        );
        const tokenIds =
          "0x" + [...Array(numberOfTokens).keys()].map(uint16ToBytes).join("");
        const ownerTokenIndexes = tokenIds;
        const candyIds = Array(numberOfTokens).fill(0);
        const candyIdsBytes = ethers.utils.hexlify(candyIds);
        const candyAmounts = Array(numberOfTokens).fill(1);
        const dreamersGas =
          await ChainDreamers.estimateGas.mintBatchRunnersAccess(
            tokenIds,
            ownerTokenIndexes,
            candyIdsBytes,
            candyIds,
            candyAmounts
          );
        const airDropGas = await ChainDreamers.estimateGas.airDropBatch(
          deployer,
          [...Array(numberOfTokens).keys()],
          [...Array(numberOfTokens).fill(0)]
        );
        return {
          candyGas: candyGas.toNumber(),
          dreamersGas: dreamersGas.toNumber(),
          airDropGas: airDropGas.toNumber(),
        };
      })
    );
    fs.writeFileSync(
      "assets/mint-gas-chapter-1.json",
      JSON.stringify(gas, null, 2)
    );

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
