import chai, { expect } from "chai";
import {
  encodeDAttribute,
  encodeDCoordinate,
  encodeDToBits,
  encodeDToBytes,
  encodePath,
  encodeTrait,
  getSvg,
  normalizeD,
  numberToUint,
  uint16ToBytes,
} from "../../utils/dreamers";
import { Path, Trait } from "../../utils/types";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";
import { loadPalettes } from "../../utils/constants";

const palettes = loadPalettes();
chai.use(jestSnapshotPlugin());

describe("dreamers utils", function () {
  describe("normalizeD", () => {
    const tests = [
      {
        args: "M 0.0,0.0 L 255.0,0.0 L 255.0,255.0 L 0.0,255.0 L 0.0,0.0",
        expected: "M 0 0 L 255 0 L 255 255 L 0 255 L 0 0",
      },
      {
        args: "M 0.0,118.0 C 0.0,118.0 32.0,274.0 37.0,178.0 C 42.0,82.0 81.0,0.0 78.0,77.0 C 75.0,195.0 102.0,276.0 112.0,194.0 C 123.0,112.0 156.0,109.0 156.0,182.0 L 156.0,255.0 L 0.0,255.0 L 0.0,118.0",
        expected:
          "M 0 118 C 0 118 32 274 37 178 C 42 82 81 0 78 77 C 75 195 102 276 112 194 C 123 112 156 109 156 182 L 156 255 L 0 255 L 0 118",
      },
    ];
    tests.forEach((test) => {
      it(`should normalize ${test.args}`, () => {
        expect(normalizeD(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("encodeDAttribute", () => {
    const tests = [
      { args: "M", expected: "000" },
      { args: "L", expected: "001" },
      { args: "Q", expected: "010" },
      { args: "C", expected: "011" },
      { args: "A", expected: "100" },
      { args: "H", expected: "101" },
      { args: "V", expected: "110" },
      { args: "Z", expected: "111" },
    ];

    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(encodeDAttribute(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("encodeDCoordinate", () => {
    const tests = [
      { args: "0", expected: "00000000" },
      { args: "1", expected: "00000001" },
      { args: "2", expected: "00000010" },
      { args: "255", expected: "11111111" },
    ];

    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(encodeDCoordinate(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("encodeDToBits", () => {
    const tests = [
      { args: "M 0 255", expected: "000" + "00000000" + "11111111" },
      { args: "L 0 255", expected: "001" + "00000000" + "11111111" },
      { args: "Q 0 255", expected: "010" + "00000000" + "11111111" },
      { args: "C 0 255", expected: "011" + "00000000" + "11111111" },
      {
        args: "M 0 255L10 20",
        expected:
          "000" + "00000000" + "11111111" + "001" + "00001010" + "00010100",
      },
      {
        args: "M 0.0,0.0 L 255.0,0.0 L 255.0,255.0 L 0.0,255.0 L 0.0,0.0",
        expected:
          "000" +
          "00000000" +
          "00000000" +
          "001" +
          "11111111" +
          "00000000" +
          "001" +
          "11111111" +
          "11111111" +
          "001" +
          "00000000" +
          "11111111" +
          "001" +
          "00000000" +
          "00000000",
      },
    ];

    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(encodeDToBits(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("encodeDToBytes", () => {
    const tests = [
      {
        args: "M 0 255",
        expected:
          "00" +
          parseInt("000" + "00000000" + "11111111" + "00000", 2).toString(16),
      },
      {
        args: "L 0 255",
        expected: parseInt(
          "001" + "00000000" + "11111111" + "00000",
          2
        ).toString(16),
      },
      {
        args: "Q 0 255",
        expected: parseInt(
          "010" + "00000000" + "11111111" + "00000",
          2
        ).toString(16),
      },
      {
        args: "C 0 255",
        expected: parseInt(
          "011" + "00000000" + "11111111" + "00000",
          2
        ).toString(16),
      },
      {
        args: "M 0 255L10 20",
        expected:
          "00" +
          parseInt(
            "000" +
              "00000000" +
              "11111111" +
              "001" +
              "00001010" +
              "00010100" +
              "00",
            2
          ).toString(16),
      },
    ];

    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(encodeDToBytes(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("uint16ToBytes", () => {
    const tests = [
      { args: 0, expected: "0000" },
      { args: 10, expected: "000a" },
      { args: 100, expected: "0064" },
      { args: 1_000, expected: "03e8" },
      { args: 10_000, expected: "2710" },
      { args: 65_535, expected: "ffff" },
    ];

    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(uint16ToBytes(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("numberToUint", () => {
    const tests = [
      { args: 0, expected: "000000000000" },
      { args: 1, expected: "000000000001" },
      { args: 2, expected: "000000000010" },
      { args: 255, expected: "000011111111" },
      { args: 4095, expected: "111111111111" },
    ];

    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(numberToUint(12)(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("encodePath", () => {
    const tests = [
      { args: { d: 0, fill: 0 } as Path, expected: "000000" },
      { args: { d: 15, fill: 0 } as Path, expected: "00f000" },
      { args: { d: 15, fill: 15 } as Path, expected: "00f00f" },
      { args: { d: 17, fill: 200 } as Path, expected: "0110c8" },
      { args: { d: 4095, fill: 4095 } as Path, expected: "ffffff" },
    ];
    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(encodePath(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("encodeTrait", () => {
    const tests = [
      {
        args: [
          { d: 0, fill: 0 },
          { d: 15, fill: 0 },
        ] as Trait,
        expected: "00000000f000",
      },
      {
        args: [
          { d: 15, fill: 15 },
          { d: 17, fill: 200 },
          { d: 4095, fill: 4095 },
        ] as Trait,
        expected: "00f00f0110c8ffffff",
      },
    ];
    tests.forEach((test) => {
      it(`should encode ${test.args} as ${test.expected}`, () => {
        expect(encodeTrait(test.args)).to.equal(test.expected);
      });
    });
  });
  describe("getSvg", () => {
    it("Should match snapshot", () => {
      expect(getSvg(palettes.trait[0])).toMatchSnapshot();
    });
  });
});
