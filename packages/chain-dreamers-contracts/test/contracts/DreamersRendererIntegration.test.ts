import chai from "chai";
import { solidity } from "ethereum-waffle";
import { deployments, ethers } from "hardhat";
import { loadPalettes, loadRunnersDna, TAGS } from "../../utils/constants";
import fs from "fs";
import path from "path";

import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(jestSnapshotPlugin());
chai.use(solidity);
const { expect } = chai;

const palettes = loadPalettes();

before(async function () {
  await deployments.fixture(TAGS.DREAMERS_PALETTES);
});

describe("DreamersRendererIntegration", async function () {
  const DreamersRenderer = await ethers.getContract("DreamersRenderer");

  describe("getTokenData", () => {
    const palettes = loadPalettes();
    loadRunnersDna().forEach((runner) => {
      it(`Should match snapshot for runner ${runner.runnerId}`, async () => {
        const dna = await DreamersRenderer.getDreamerFullDna(
          ethers.BigNumber.from(runner.dna),
          0
        );
        const tokenData = await DreamersRenderer.getTokenData(dna);
        expect(
          tokenData.map((i: number) => ({
            index: i,
            name: Object.keys(palettes.trait)[i],
          }))
        ).to.toMatchSnapshot();
      });
    });
  });
  describe("getSvg", () => {
    Object.keys(palettes.trait).forEach((traitName, index) => {
      it(`Index ${index} should return ${traitName}`, async function () {
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
