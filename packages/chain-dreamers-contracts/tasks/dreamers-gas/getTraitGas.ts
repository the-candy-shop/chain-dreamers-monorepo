import { task } from "hardhat/config";
import { loadPalettes, TAGS } from "../../utils/constants";
import fs from "fs";
import { SingleBar } from "cli-progress";

task(
  "get-trait-gas",
  "Estimate the gas used to retrieve traits indexes"
).setAction(async ({}, { ethers, deployments }) => {
  await deployments.fixture(TAGS.DREAMERS_PALETTES);
  const DreamersRenderer = await ethers.getContract("DreamersRenderer");

  const palettes = loadPalettes();
  const bar = new SingleBar({});
  bar.start(Object.keys(palettes.trait).length, 0);
  const getTraitGas = await Promise.all(
    Object.keys(palettes.trait).map(async (trait, index) => {
      const gas = await DreamersRenderer.estimateGas.getTrait(index);
      bar.update(index + 1);
      return { [trait]: gas.toString() };
    })
  );
  bar.stop();
  fs.writeFileSync(
    "./get-trait-gas.json",
    JSON.stringify(
      getTraitGas.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
      null,
      2
    )
  );
});
