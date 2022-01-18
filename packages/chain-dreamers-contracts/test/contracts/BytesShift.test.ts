import { setupUser, setupUsers } from "./utils";
import { expect } from "chai";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { TAGS } from "../../utils/constants";

async function setup() {
  await deployments.fixture([TAGS.BYTES_SHIFT]);
  const contracts = {
    BytesShift: await ethers.getContract("BytesShift"),
  };
  const { deployer } = await getNamedAccounts();
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    deployer: await setupUser(deployer, contracts),
  };
}

describe("BytesShift", function () {
  describe("shiftLeft", () => {
    it(`Should shift bytes to the left`, async function () {
      const { BytesShift } = await setup();
      const res = await BytesShift.shiftLeft("0xffff", 1);
      expect(res).to.equal("0xfffe");
    });
  });
});
