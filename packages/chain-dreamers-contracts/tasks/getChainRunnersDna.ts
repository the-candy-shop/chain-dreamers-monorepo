import { getMainnetSdk } from "@dethcrypto/eth-sdk-client";

import { task } from "hardhat/config";
import fs from "fs";

task("get-chain-runners-dna", "Export the 10k runners DNA")
  .addOptionalParam("output", "The output file", "runners-dna.json")
  .setAction(async ({ output }, { ethers, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const sdk = getMainnetSdk(signer);

    const dnas = [];
    for (let i = 1; i <= 5; i++) {
      console.log(`Fetching batch ${i}`);
      const newDnas = await Promise.all(
        [...Array(2_001).keys()].slice(1).map(async (j) => {
          console.log(` * batch index ${j}`);
          const runnerId = j + 2_000 * (i - 1);
          console.log(`    * runner ${runnerId}`);
          const dna = await sdk.chainRunners.getDna(runnerId);
          return { runnerId, dna: dna.toString() };
        })
      );
      dnas.push(...newDnas);

      console.log(`Waiting 20 seconds`);
      await new Promise((resolve) => setTimeout(resolve, 20_000));
    }
    fs.writeFileSync(output, JSON.stringify(dnas, null, 2));
  });
