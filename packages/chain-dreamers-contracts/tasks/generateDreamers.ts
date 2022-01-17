import { task } from "hardhat/config";
import fs from "fs";
import { TAGS } from "../utils/constants";

task("generate-dreamers", "Generate dreamers")
  .addOptionalParam("outputDir", "The output directory", "assets/DREAMERS")
  .addOptionalParam("runnerId", "The runner id", "")
  .setAction(async ({ outputDir, runnerId }, { deployments }) => {
    await deployments.fixture(TAGS.DREAMERS_PALETTES);
    const { read } = deployments;

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const runnerIds = runnerId
      ? [runnerId]
      : [...Array(10_001).keys()].slice(1);

    await Promise.all(
      runnerIds.map(async (index) => {
        const dreamer = await read(
          "DreamersRenderer",
          "getSvg(uint256)",
          index
        );
        fs.writeFileSync(`${outputDir}/${index}.svg`, dreamer, {
          encoding: "utf-8",
        });
      })
    );
  });
