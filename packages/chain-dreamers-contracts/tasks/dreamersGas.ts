import { task } from "hardhat/config";
import { loadPalettes, TAGS } from "../utils/constants";
import fs from "fs";

task(
  "dreamers-gas",
  "Estimate the gas used to generate traits and dreamers"
).setAction(async ({ output }, { ethers, deployments }) => {
  await deployments.fixture(TAGS.DREAMERS_PALETTES);
  const DreamersRenderer = await ethers.getContract("DreamersRenderer");

  const palettes = loadPalettes();
  const gasPerTrait = await Promise.all(
    Object.keys(palettes.trait).map(async (trait, index) => {
      const gas = await DreamersRenderer.estimateGas.getTrait(index);
      return { [trait]: gas.toString() };
    })
  );
  fs.writeFileSync(
    "./traits-gas.json",
    JSON.stringify(
      gasPerTrait.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
      null,
      2
    )
  );
  const gasPerDreamer = await Promise.all(
    [...Array(10_001).keys()].slice(1).map(async (index) => {
      const gas = await DreamersRenderer.estimateGas["getSvg(uint256)"](index);
      return { [index]: gas.toString() };
    })
  );
  fs.writeFileSync(
    "./dreamers-gas.json",
    JSON.stringify(
      gasPerDreamer.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
      null,
      2
    )
  );
});
