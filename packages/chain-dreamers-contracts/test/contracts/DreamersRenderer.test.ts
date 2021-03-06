import chai from "chai";
import { solidity } from "ethereum-waffle";
import { deployments, ethers } from "hardhat";

import { encodeDToBytes, inlineTrait, normalizeD } from "../../utils/dreamers";
import {
  loadPalettes,
  loadPalettesEncoded,
  NONE_COLOR,
  TAGS,
} from "../../utils/constants";

import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(jestSnapshotPlugin());
chai.use(solidity);
const { expect } = chai;

const palettes = loadPalettes();
const palettesEncoded = loadPalettesEncoded();

describe("DreamersRenderer", async function () {
  describe("getFill", () => {
    palettes.fill
      .map((f) => (f === NONE_COLOR ? "none" : `%23${f.toUpperCase()}`))
      .forEach((fill, index) => {
        it(`Index ${index} should return ${fill}`, async function () {
          await deployments.fixture(TAGS.DREAMERS_PALETTES);
          const DreamersRenderer = await ethers.getContract("DreamersRenderer");
          const res = await DreamersRenderer.getFill(index);
          expect(res).to.equal(fill);
        });
      });
  });

  describe("getDIndex", () => {
    palettesEncoded.dIndexesDebug.slice(0, -1).forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        await deployments.fixture(TAGS.DREAMERS_PALETTES);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
        const res = await DreamersRenderer.getDIndex(index);
        expect(res[0]).to.equal(d);
      });
    });
  });

  describe("getDBytes", () => {
    palettes.d.map(encodeDToBytes).forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        await deployments.fixture(TAGS.DREAMERS_PALETTES);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
        const res = await DreamersRenderer.getDBytes(index);
        expect(res).to.equal("0x" + d);
      });
    });
  });

  describe("getD", () => {
    palettes.d.forEach((d, index) => {
      it(`Index ${index} should return ${d}`, async function () {
        await deployments.fixture(TAGS.DREAMERS_PALETTES);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
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
        await deployments.fixture(TAGS.DREAMERS_PALETTES);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
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
          ? [0] // don't know how many they should be
          : [
              ...Array(
                palettes.layerIndexes[_layerIndex + 1] - layerIndex + 1
              ).keys(),
            ];
      itemIndexes.forEach((itemIndex) => {
        const expected =
          itemIndex === palettes.layerIndexes[_layerIndex + 1] - layerIndex
            ? 65535
            : layerIndex + itemIndex;

        it(`Layer ${_layerIndex}, item ${itemIndex} should return ${expected}`, async function () {
          await deployments.fixture(TAGS.DREAMERS_PALETTES);
          const DreamersRenderer = await ethers.getContract("DreamersRenderer");
          const res = await DreamersRenderer.getTraitIndex(
            _layerIndex,
            itemIndex
          );
          expect(res).to.equal(expected);
        });
      });
    });
  });

  describe("tokenURI", async () => {
    const tokenIds = [...Array(10_001).keys()].slice(1);
    tokenIds.map((tokenId) => {
      it("should return correct URI for tokenId " + tokenId, async function () {
        await deployments.fixture(TAGS.DREAMERS_PALETTES);
        const DreamersRenderer = await ethers.getContract("DreamersRenderer");
        const res = await DreamersRenderer.tokenURI(tokenId, 0);
        expect(res).to.equal(
          `https://api.chaindreamers.xyz/tokens/${tokenId}/metadata`
        );
      });
    });
  });
});
