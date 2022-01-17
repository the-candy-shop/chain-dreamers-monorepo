import { setupUser, setupUsers } from "./utils";
import chai from "chai";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { TAGS } from "../../utils/constants";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";
import { solidity } from "ethereum-waffle";

chai.use(jestSnapshotPlugin());
chai.use(solidity);
const { expect } = chai;

async function setup() {
  await deployments.fixture([TAGS.CHAIN_RUNNERS]);
  const contracts = {
    ChainRunnersLayerRenderer: await ethers.getContract(
      "ChainRunnersLayerRenderer"
    ),
  };
  const { deployer } = await getNamedAccounts();
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    deployer: await setupUser(deployer, contracts),
  };
}

describe("ChainRunnersLayerRenderer", function () {
  describe("traitSVG", () => {
    it(`Should match snapshot`, async function () {
      const { ChainRunnersLayerRenderer } = await setup();
      const res = await ChainRunnersLayerRenderer.traitSVG(3, 1);
      expect(res).to.toMatchSnapshot();
    });
  });
});
