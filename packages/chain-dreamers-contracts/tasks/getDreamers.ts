import { task } from "hardhat/config";
import { SingleBar } from "cli-progress";
import fs from "fs";

task("get-dreamers", "Dump all dreamers")
  .addOptionalParam("start", "Start index", "1")
  .addOptionalParam("stop", "Start index", "2")
  .setAction(async ({ start, stop }, { deployments }) => {
    const { read } = deployments;
    const bar = new SingleBar({});
    start = parseInt(start);
    stop = parseInt(stop);
    bar.start(stop - start, start);
    const dreamerSvgs = [];
    for (let i = start; i <= stop; i++) {
      const dreamerSvg = await read("DreamersRenderer", "imageURI", i, 3);
      bar.update(i);
      dreamerSvgs.push(dreamerSvg);
    }
    bar.stop();

    fs.writeFileSync(
      "assets/all-dreamers.json",
      JSON.stringify(dreamerSvgs, null, 2)
    );
  });
