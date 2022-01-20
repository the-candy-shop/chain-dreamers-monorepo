import chai from "chai";
import { solidity } from "ethereum-waffle";
import { deployments, ethers } from "hardhat";

import { encodeDToBytes, inlineTrait, normalizeD } from "../../utils/dreamers";
import {
  loadPalettes,
  loadPalettesStorage,
  NONE_COLOR,
  TAGS,
} from "../../utils/constants";

import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(jestSnapshotPlugin());
chai.use(solidity);
const { expect } = chai;

const palettes = loadPalettes();
const palettesStorage = loadPalettesStorage();

before(async function () {
  await deployments.fixture(TAGS.DREAMERS_PALETTES);
});

describe("DreamersRenderer", async function () {
  const DreamersRenderer = await ethers.getContract("DreamersRenderer");

  describe.only("getFill", () => {
    palettes.fill
      .map((f) => (f === NONE_COLOR ? "none" : `#${f.toUpperCase()}`))
      .forEach((fill, index) => {
        it(`Index ${index} should return ${fill}`, async function () {
          const res = await DreamersRenderer.getFill(index);
          expect(res).to.equal(fill);
        });
      });
  });

  describe("getDIndex", () => {
    palettesStorage.dIndexesDebug.slice(0, -1).forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        const res = await DreamersRenderer.getDIndex(index);
        expect(res[0]).to.equal(d);
      });
    });
  });

  describe("getDBytes", () => {
    palettes.d.map(encodeDToBytes).forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        const res = await DreamersRenderer.getDBytes(index);
        expect(res).to.equal("0x" + d);
      });
    });
  });

  describe("getD", () => {
    palettes.d.forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
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
        const res = await DreamersRenderer.getTrait(index);
        expect(res).to.deep.equal(
          trait.map((t) => [t.d, t.fill, t.stroke > 0])
        );
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
});
