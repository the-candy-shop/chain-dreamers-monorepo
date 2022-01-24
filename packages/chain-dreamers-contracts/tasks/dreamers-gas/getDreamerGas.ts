import { task } from "hardhat/config";
import { TAGS } from "../../utils/constants";
import fs from "fs";
import { SingleBar } from "cli-progress";

task(
  "dreamers-gas",
  "Estimate the gas used to generate traits and dreamers"
).setAction(async ({}, { ethers, deployments }) => {
  await deployments.fixture(TAGS.DREAMERS_PALETTES);
  const DreamersRenderer = await ethers.getContract("DreamersRenderer");

  const bar = new SingleBar({});
  bar.start(10_000, 0);
  const gasPerDreamer = await Promise.all(
    [...Array(10_001).keys()].slice(1).map(async (index) => {
      const gas = await DreamersRenderer.estimateGas["getSvg(uint256)"](index);
      console.log(`gas for ${index} dreamers: ${gas.toString()}`);
      bar.update(index);
      return { [index]: gas.toString() };
    })
  );
  bar.stop();
  fs.writeFileSync(
    "./dreamers-gas.json",
    JSON.stringify(
      gasPerDreamer.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
      null,
      2
    )
  );
});
