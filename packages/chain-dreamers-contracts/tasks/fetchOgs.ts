import { task } from "hardhat/config";
import fs from "fs";

task("fetch-ogs", "Fetch data for the original Dreamers contract").setAction(
  async ({}, { deployments }) => {
    const { read } = deployments;

    const tokenExists: boolean[] = await read(
      "ChainDreamers",
      "getTokenExists"
    );
    const tokens = await Promise.all(
      tokenExists
        .map((exist, tokenId) => ({ tokenId, exist }))
        .filter(({ exist }) => exist)
        .map(async (token) => {
          const owner = await read("ChainDreamers", "ownerOf", token.tokenId);
          const candy = await read(
            "ChainDreamers",
            "dreamersCandies",
            token.tokenId
          );
          console.log(
            `Token ${token.tokenId} owned by ${owner} with candy ${candy}`
          );
          return { ...token, owner, candy };
        })
    );

    fs.writeFileSync("assets/ogs.json", JSON.stringify(tokens, null, 2));
  }
);
