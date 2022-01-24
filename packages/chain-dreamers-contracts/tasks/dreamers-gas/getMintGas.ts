import { task } from "hardhat/config";
import { TAGS } from "../../utils/constants";
import { uint16ToBytes } from "../../utils/dreamers";
import fs from "fs";

task(
  "get-mint-gas",
  "Estimate the gas used to retrieve traits indexes"
).setAction(async ({}, { ethers, getNamedAccounts, network, deployments }) => {
  await deployments.fixture(TAGS.BIND_DREAMERS_AND_CANDY_SHOP);

  const { execute } = deployments;
  const { deployer } = await getNamedAccounts();
  await execute(
    "ChainDreamers",
    { from: deployer },
    "setPublicSaleTimestamp",
    1
  );
  await execute(
    "ChainDreamers",
    {
      from: deployer,
      log: true,
    },
    "setMaxDreamersMintPublicSale",
    256
  );

  await network.provider.send("evm_setAutomine", [false]);
  await network.provider.send("evm_setIntervalMining", [1000]);

  const ChainDreamers = await ethers.getContract("ChainDreamers");
  const gas = await Promise.all(
    [...Array(255).keys()].map(async (count) => {
      console.log(count);

      const g = await ChainDreamers.estimateGas.mintBatchPublicSale(
        "0x" + [...Array(count + 1).keys()].map(uint16ToBytes).join(""),
        "0x" + [...Array(count + 1).keys()].map(uint16ToBytes).join(""),
        {
          value: ethers.utils.parseEther(
            (0.05 * (count + 1)).toFixed(2).toString()
          ),
          from: deployer,
        }
      );
      console.log(g.toNumber());
      return g;
    })
  );
  fs.writeFileSync("assets/mint-gas.json", JSON.stringify(gas, null, 2));
});
