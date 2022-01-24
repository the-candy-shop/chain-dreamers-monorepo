import chai from "chai";
import { solidity } from "ethereum-waffle";
import { deployments, ethers } from "hardhat";
import {
  loadPalettes,
  loadRunnersTokenData,
  TAGS,
} from "../../utils/constants";
import fs from "fs";
import path from "path";

import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(jestSnapshotPlugin());
chai.use(solidity);
const { expect } = chai;

const palettes = loadPalettes();

describe("DreamersRendererIntegration", async function () {
  describe("getTokenData", () => {
    const palettes = loadPalettes();

    loadRunnersTokenData().forEach((runner, index) => {
      it(`Should match runner's data with no drug for runner ${
        index + 1
      }`, async () => {
        await deployments.fixture([TAGS.DREAMERS_PALETTES]);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
        let tokenData = await DreamersRenderer.getTokenData(runner.dna, 3);
        tokenData = tokenData
          .filter((i: number) => i < 65535)
          .map((i: number) => Object.keys(palettes.trait)[i])
          .map(
            (fileName: string) =>
              fileName.match(/\d+-\d+-(?<traitName>[a-zA-Z \d\-']+)\.svg$/)
                ?.groups?.traitName
          );
        expect(tokenData).to.have.members(
          runner.tokenData.filter((name) => !!name)
        );
      });
    });
  });
  describe("getSvg", () => {
    Object.keys(palettes.trait).forEach((traitName, index) => {
      it(`Index ${index} should return ${traitName}`, async function () {
        await deployments.fixture([TAGS.DREAMERS_PALETTES]);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
        const traitIndexes = await DreamersRenderer.getTrait(index);
        const gas = await DreamersRenderer.estimateGas.getSvg(traitIndexes);
        if (gas > ethers.BigNumber.from(50_000_000)) {
          throw new Error(
            `Gas cost of ${gas} is too high. Please adjust the gas limit.`
          );
        }
        const res = await DreamersRenderer.getSvg(traitIndexes);
        const outputFile = `./test/contracts/__snapshots__/TRAITS/${traitName
          .split("/")
          .slice(2)
          .join("/")}`;
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, res);
        expect(res).to.toMatchSnapshot();
      });
    });
  });
  describe("tokenURI", () => {
    [...Array(10_001).keys()].slice(1, 2).forEach((runnerId) => {
      it(`Index ${runnerId} should match snapshot`, async function () {
        await deployments.fixture([TAGS.DREAMERS_PALETTES]);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
        const gas = await DreamersRenderer.estimateGas.tokenURI(runnerId);
        if (gas > ethers.BigNumber.from(50_000_000)) {
          throw new Error(
            `Gas cost of ${gas} is too high. Please adjust the gas limit.`
          );
        }
        const res = await DreamersRenderer.tokenURI(runnerId);
        console.log(res);
        const outputFile = `./test/contracts/__snapshots__/DREAMERS/${runnerId}.json`;
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, res);
        expect(res).to.toMatchSnapshot();
      });
    });
  });
});
