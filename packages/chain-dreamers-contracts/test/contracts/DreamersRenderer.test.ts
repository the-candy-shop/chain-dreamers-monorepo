import { setupUser, setupUsers } from "./utils";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";

import { encodeDToBytes, inlineTrait, normalizeD } from "../../utils/dreamers";
import { DreamersRenderer } from "../../typechain";
import {
  loadPalettes,
  loadPalettesStorage,
  loadRunnersDna,
  NONE_COLOR,
  TAGS,
} from "../../utils/constants";
import fs from "fs";
import path from "path";

import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(jestSnapshotPlugin());
chai.use(solidity);
const { expect } = chai;

const palettes = loadPalettes();
const palettesStorage = loadPalettesStorage();

async function setup(tags: string[]) {
  await deployments.fixture(tags);
  const contracts = {
    DreamersRenderer: (await ethers.getContract(
      "DreamersRenderer"
    )) as DreamersRenderer,
  };
  const { deployer } = await getNamedAccounts();
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    deployer: await setupUser(deployer, contracts),
  };
}

describe("DreamersRenderer", function () {
  describe.only("getFill", () => {
    palettes.fill.forEach((fill, index) => {
      it(`Index ${index} should return ${
        fill === NONE_COLOR ? "none" : fill
      }`, async function () {
        const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
        const res = await DreamersRenderer.getFill(index);
        if (fill === NONE_COLOR) {
          expect(res).to.equal("none");
        } else {
          expect(res.toUpperCase()).to.equal("#" + fill.toUpperCase());
        }
      });
    });
  });
  describe("getDIndex", () => {
    palettesStorage.dIndexesDebug.slice(0, -1).forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        this.timeout(0);
        const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
        const res = await DreamersRenderer.getDIndex(index);
        expect(res[0]).to.equal(d);
      });
    });
  });
  describe("getDBytes", () => {
    palettes.d.forEach((d, index) => {
      it(`Index ${index} should return ${encodeDToBytes(
        d
      )}`, async function () {
        this.timeout(0);
        const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
        const res = await DreamersRenderer.getDBytes(index);
        expect(res).to.equal("0x" + encodeDToBytes(d));
      });
    });
  });
  describe("getD", () => {
    palettes.d.forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        this.timeout(0);
        const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
        const dBytes = await DreamersRenderer.getDBytes(index);
        const res = await DreamersRenderer.getD(dBytes);
        expect(normalizeD(res)).to.equal(normalizeD(d));
      });
    });
  });
  describe("getTrait", () => {
    Object.values(palettes.trait).forEach((trait, index) => {
      it(`Index ${index} should return ${inlineTrait(
        trait
      )}`, async function () {
        const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
        const res = await DreamersRenderer.getTrait(index);
        expect(res).to.deep.equal(trait.map((t) => Object.values(t)));
      });
    });
  });
  describe("getSvg", () => {
    describe("getSvg(uint16[2][])", () => {
      Object.keys(palettes.trait).forEach((traitName, index) => {
        it(`Index ${index} should return ${traitName}`, async function () {
          this.timeout(0);
          const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
          const traitIndexes = await DreamersRenderer.getTrait(index);
          const res = await DreamersRenderer.functions["getSvg(uint16[2][])"](
            traitIndexes
          );
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
    describe("getSvg(uint256)", () => {
      [...Array(10_001).keys()].slice(1).forEach((runnerId) => {
        it(`Index ${runnerId} should match snapshot`, async function () {
          this.timeout(0);
          const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
          const res = await DreamersRenderer.functions["getSvg(uint256)"](
            runnerId
          );
          console.log(res[0]);
          const outputFile = `./test/contracts/__snapshots__/DREAMERS/${runnerId}.svg`;
          fs.mkdirSync(path.dirname(outputFile), { recursive: true });
          fs.writeFileSync(outputFile, res[0]);
          expect(res[0]).to.toMatchSnapshot();
        });
      });
    });
  });
  describe("getTraitIndex", () => {
    palettes.layerIndexes.forEach((layerIndex, _layerIndex) => {
      const itemIndexes =
        _layerIndex === palettes.layerIndexes.length - 1
          ? [0]
          : [
              ...Array(
                palettes.layerIndexes[_layerIndex + 1] - layerIndex + 1
              ).keys(),
            ];
      itemIndexes.forEach((itemIndex) => {
        it(`Layer ${_layerIndex}, item ${itemIndex} should return ${
          itemIndex === palettes.layerIndexes[_layerIndex + 1] - layerIndex
            ? 65535
            : layerIndex + itemIndex
        }`, async function () {
          this.timeout(0);
          const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
          const res = await DreamersRenderer.getTraitIndex(
            _layerIndex,
            itemIndex
          );
          expect(res).to.equal(
            itemIndex === palettes.layerIndexes[_layerIndex + 1] - layerIndex
              ? 65535
              : layerIndex + itemIndex
          );
        });
      });
    });
  });
  describe("getTokenData", () => {
    const palettes = loadPalettes();
    loadRunnersDna().forEach((runner) => {
      it(`Should match snapshot for runner ${runner.runnerId}`, async () => {
        const { DreamersRenderer } = await setup([TAGS.DREAMERS_PALETTES]);
        const tokenData = await DreamersRenderer.getTokenData(
          ethers.BigNumber.from(runner.dna)
        );
        expect(
          tokenData.map((i) => ({
            index: i,
            name: Object.keys(palettes.trait)[i],
          }))
        ).to.toMatchSnapshot();
      });
    });
  });
});
