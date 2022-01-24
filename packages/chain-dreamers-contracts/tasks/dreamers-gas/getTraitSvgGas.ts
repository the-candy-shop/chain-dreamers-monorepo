import { task } from "hardhat/config";
import { loadPalettes, TAGS } from "../../utils/constants";
import fs from "fs";
import { SingleBar } from "cli-progress";

task("get-trait-svg-gas", "Estimate the gas used to generate traits").setAction(
  async ({}, { ethers, deployments }) => {
    await deployments.fixture(TAGS.DREAMERS_PALETTES);
    const DreamersRenderer = await ethers.getContract("DreamersRenderer");

    const palettes = loadPalettes();
    const bar = new SingleBar({});

    bar.start(Object.keys(palettes.trait).length, 0);
    const getTraitSvgGas = await Promise.all(
      Object.keys(palettes.trait).map(async (trait, index) => {
        const traits = await DreamersRenderer.getTrait(index);
        let gas;
        try {
          gas = await DreamersRenderer.estimateGas["getSvg(uint16[2][])"](
            traits
          );
          gas = gas.toString();
        } catch (e) {
          console.log(e);
          console.log(`getSvg failed for ${trait} at index ${index}`);
        }
        bar.update(index + 1);
        return { [trait]: gas };
      })
    );
    bar.stop();
    fs.writeFileSync(
      "./get-traits-svg-gas.json",
      JSON.stringify(
        getTraitSvgGas.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
        null,
        2
      )
    );
  }
);
