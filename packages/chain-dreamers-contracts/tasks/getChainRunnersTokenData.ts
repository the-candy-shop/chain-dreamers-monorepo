import { getMainnetSdk } from "@dethcrypto/eth-sdk-client";
import { chunk } from "lodash";
import { task } from "hardhat/config";
import fs from "fs";
import { loadRunnersDna, RUNNERS_TOKEN_DATA_FILE } from "../utils/constants";
import { decode } from "../utils/base64";

task("get-chain-runners-token-data", "Export the 10k runners DNA")
  .addOptionalParam("output", "The output file", RUNNERS_TOKEN_DATA_FILE)
  .setAction(async ({ output }, { ethers, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const sdk = getMainnetSdk(signer);

    const dnas = chunk(loadRunnersDna(), 1_500);
    const allTokenData = [];
    for (let i = 0; i < dnas.length; i++) {
      console.log(`Fetching batch ${i}`);
      const newTokenData = await Promise.all(
        dnas[i].map(async (dna) => {
          const tokenData = await sdk.chainRunnersBaseRenderer.getTokenData(
            dna.dna
          );
          return {
            dna: dna.dna,
            tokenData: tokenData.tokenLayers.map((l) => decode(l.name).trim()),
          };
        })
      );
      allTokenData.push(...newTokenData);

      console.log(`Waiting 20 seconds`);
      await new Promise((resolve) => setTimeout(resolve, 20_000));
    }
    fs.writeFileSync(output, JSON.stringify(allTokenData, null, 2));
  });
