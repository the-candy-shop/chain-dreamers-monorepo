import { task } from "hardhat/config";
import { uint16ToBytes } from "../utils/dreamers";

task(
  "open-and-mint-batch-founders",
  "Open public sale and mint a batch of Chain Dreamers to the founders"
).setAction(async ({}, { deployments, getNamedAccounts, ethers }) => {
  const { deployer } = await getNamedAccounts();
  const { execute, read } = deployments;

  const tokenExists: boolean[] = await read("ChainDreamers", "getTokenExists");
  const selectedTokens = tokenExists
    .map((exist, tokenId) => ({ tokenId, exist, sort: Math.random() }))
    .filter(({ exist }) => !exist)
    .sort((a, b) => a.sort - b.sort)
    .map(({ tokenId }) => tokenId)
    .slice(0, 50);

  const blockNumber = await ethers.provider.getBlockNumber();
  const currentTimestamp = await ethers.provider
    .getBlock(blockNumber)
    .then((block) => block.timestamp);
  console.log(`Current timestamp: ${currentTimestamp}`);

  await execute(
    "ChainDreamers",
    { from: deployer, log: true },
    "setPublicSaleTimestamp",
    currentTimestamp
  );

  await execute(
    "ChainDreamers",
    {
      from: deployer,
      log: true,
    },
    "mintBatchFounders",
    "0x" + selectedTokens.map(uint16ToBytes).join("")
  );
});
