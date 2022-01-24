import { setupUser, setupUsers } from "./utils";
import { expect } from "chai";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";

async function setup() {
  await deployments.fixture(["Integers"]);
  const contracts = {
    Integers: await ethers.getContract("Integers"),
  };
  const { deployer } = await getNamedAccounts();
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    deployer: await setupUser(deployer, contracts),
  };
}

describe("Integers", function () {
  describe("toString", () => {
    const tests = [
      { args: [0, 10, 0], expected: "0" },
      { args: [0, 16, 0], expected: "0" },
      { args: [0, 16, 2], expected: "00" },
      { args: [1, 10, 0], expected: "1" },
      { args: [1, 16, 0], expected: "1" },
      { args: [1, 16, 2], expected: "01" },
      { args: [10, 10, 0], expected: "10" },
      { args: [10, 16, 0], expected: "A" },
      { args: [10, 16, 2], expected: "0A" },
      { args: [15, 10, 0], expected: "15" },
      { args: [15, 16, 0], expected: "F" },
      { args: [15, 16, 2], expected: "0F" },
      { args: [16, 10, 0], expected: "16" },
      { args: [16, 16, 0], expected: "10" },
      { args: [16, 16, 2], expected: "10" },
      { args: [255, 10, 0], expected: "255" },
      { args: [255, 16, 0], expected: "FF" },
      { args: [255, 16, 2], expected: "FF" },
    ];
    tests.forEach((test) =>
      it(`Should write ${test.args[0]} to string with base ${test.args[1]} and padding ${test.args[2]}`, async function () {
        const { Integers } = await setup();
        const res = await Integers.functions["toString(uint256,uint8,uint8)"](
          test.args[0],
          test.args[1],
          test.args[2]
        );
        expect(res[0]).to.equal(test.expected);
      })
    );
  });
  describe("load16", () => {
    const tests = [
      { args: ["0x00", "0x01"], expected: 1 },
      { args: ["0x00", "0x10"], expected: 16 },
      { args: ["0x01", "0x00"], expected: 256 },
      { args: ["0x10", "0x00"], expected: 4_096 },
      { args: ["0xff", "0xff"], expected: 65_535 },
    ];
    tests.forEach((test) =>
      it(`Should decode ${test.args} to ${test.expected}`, async function () {
        const { Integers } = await setup();
        const res = await Integers.load16(test.args[0], test.args[1]);
        expect(res).to.equal(test.expected);
      })
    );
  });
  describe("load12", () => {
    const tests = [
      {
        args: ["0x00", "0x01", "0x01"],
        expected: [parseInt("000", 16), parseInt("101", 16)],
      },
      {
        args: ["0x11", "0x01", "0x01"],
        expected: [parseInt("110", 16), parseInt("101", 16)],
      },
      {
        args: ["0x10", "0x11", "0x01"],
        expected: [parseInt("101", 16), parseInt("101", 16)],
      },
      {
        args: ["0x00", "0x00", "0x00"],
        expected: [0, 0],
      },
      {
        args: ["0xff", "0xff", "0xff"],
        expected: [4_095, 4_095],
      },
    ];
    tests.forEach((test) =>
      it(`Should decode ${test.args} to ${test.expected}`, async function () {
        const { Integers } = await setup();
        const res = await Integers.load12x2(
          test.args[0],
          test.args[1],
          test.args[2]
        );
        expect(res[0]).to.equal(test.expected[0]);
        expect(res[1]).to.equal(test.expected[1]);
      })
    );
  });
});
