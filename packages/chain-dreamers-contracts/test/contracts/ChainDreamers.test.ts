import { setupUser, setupUsers } from "./utils";
import chai from "chai";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { solidity } from "ethereum-waffle";
import { loadSkus, TAGS } from "../../utils/constants";
import { uint16ToBytes } from "../../utils/dreamers";
import { BigNumber } from "ethers";

chai.use(solidity);
const { expect } = chai;

const setup = async () => {
  await deployments.fixture([
    TAGS.CHAIN_DREAMERS,
    TAGS.CHAIN_RUNNERS,
    TAGS.CANDY_SHOP_INVENTORY,
    TAGS.BIND_DREAMERS_AND_CANDY_SHOP,
  ]);
  const contracts = {
    ChainDreamers: await ethers.getContract("ChainDreamers"),
    ChainRunners: await ethers.getContract("ChainRunners"),
    CandyShop: await ethers.getContract("CandyShop"),
  };
  const { deployer, userWithRunner, userWithRunnerNoCandy, userWithoutRunner } =
    await getNamedAccounts();
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    deployer: await setupUser(deployer, contracts),
    userWithRunner: await setupUser(userWithRunner, contracts),
    userWithRunnerNoCandy: await setupUser(userWithRunnerNoCandy, contracts),
    userWithoutRunner: await setupUser(userWithoutRunner, contracts),
  };
};

const skus = loadSkus();
const runnersAccessFixture = deployments.createFixture(async ({ ethers }) => {
  const contractsAndUsers = await setup();
  await contractsAndUsers.userWithRunner.ChainRunners.mint(0);
  await contractsAndUsers.userWithRunner.ChainRunners.mint(2);
  await contractsAndUsers.userWithRunner.ChainRunners.mint(3);
  await contractsAndUsers.userWithRunner.ChainRunners.mint(4);
  const amounts = [2, 1, 1];
  const value = ethers.utils.parseEther(
    amounts
      .map((a, i) => skus[i].price * a)
      .reduce((i, j) => i + j)
      .toString()
  );
  await contractsAndUsers.userWithRunner.CandyShop.mintBatch(
    [0, 1, 2],
    amounts,
    { value }
  );
  await contractsAndUsers.userWithRunnerNoCandy.ChainRunners.mint(1);
  return contractsAndUsers;
});

const publicSaleFixture = deployments.createFixture(async ({ network }) => {
  const contractsAndUsers = await setup();
  await contractsAndUsers.deployer.ChainDreamers.setPublicSaleTimestamp(1);
  await network.provider.send("evm_setAutomine", [false]);
  await network.provider.send("evm_setIntervalMining", [1000]);
  return contractsAndUsers;
});

describe("ChainDreamers", function () {
  describe("mintBatchRunnersAccess", async function () {
    it("should revert when candy Ids lengths do not match", async () => {
      const { users } = await runnersAccessFixture();
      expect(
        users[0].ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0]),
          [0, 0],
          [1]
        )
      ).to.be.revertedWith("Candy ids should have the same length");
    });
    it("should revert when candy Ids and token ids length do not match", async () => {
      const { users } = await runnersAccessFixture();
      expect(
        users[0].ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0, 1]),
          [0, 1],
          [1, 1]
        )
      ).to.be.revertedWith("Each runner needs its own candy");
    });
    it("should revert when user tries to mint a runner he doesn't own", async function () {
      const { userWithoutRunner } = await runnersAccessFixture();
      expect(
        userWithoutRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [1].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([1]),
          [1],
          [1]
        )
      ).to.be.revertedWith(
        "You cannot give candies to a runner that you do not own"
      );
    });
    it("should revert when candies ids do not match", async () => {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0]),
          [1],
          [1]
        )
      ).to.be.revertedWith("Candy ids should be the same");
    });
    it("should revert when candy amount does not equal 1", async () => {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0]),
          [0],
          [2]
        )
      ).to.be.revertedWith(
        "Your runner needs one and only one candy, who knows what could happen otherwise"
      );
    });
    it("should revert when ownerTokenIndexes and token Ids length do not match", async () => {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0]),
          [0],
          [1]
        )
      ).to.be.revertedWith(
        "ownerIndexes must have the same length as tokenIds"
      );
    });
    it("should revert when token indexes do not start from 0 for the first mint", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0, 2, 3, 4].map(uint16ToBytes).join(""),
          "0x" + [1, 2, 3, 4].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0, 1, 2, 0]),
          [0, 1, 2, 0],
          [1, 1, 1, 1]
        )
      ).to.be.revertedWith(
        "The given ownerTokenIndexes do not start from the current owner count"
      );
    });
    it("should revert when token indexes do not start from previous index", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [0, 2].map(uint16ToBytes).join(""),
        "0x" + [0, 1].map(uint16ToBytes).join(""),
        ethers.utils.hexlify([0, 1]),
        [0, 1],
        [1, 1]
      );
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [3, 4].map(uint16ToBytes).join(""),
          "0x" + [3, 4].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0, 2]),
          [0, 2],
          [1, 1]
        )
      ).to.be.revertedWith(
        "The given ownerTokenIndexes do not start from the current owner count"
      );
    });
    it("should revert when token indexes are not a sequence", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0, 2, 3, 4].map(uint16ToBytes).join(""),
          "0x" + [0, 2, 3, 4].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0, 1, 2, 0]),
          [0, 1, 2, 0],
          [1, 1, 1, 1]
        )
      ).to.be.revertedWith("ownerTokenIndexes must be a sequence");
    });
    it("should revert when trying to mint twice the same token", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [0].map(uint16ToBytes).join(""),
        "0x" + [0].map(uint16ToBytes).join(""),
        ethers.utils.hexlify([0]),
        [0],
        [1]
      );
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0, 2].map(uint16ToBytes).join(""),
          "0x" + [1, 2].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0, 2]),
          [0, 2],
          [1, 1]
        )
      ).to.be.revertedWith("ERC721: token already minted");
    });
    it("should revert when minting without burning candies", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([0]),
          [0],
          [0]
        )
      ).to.be.revertedWith(
        "Your runner needs one and only one candy, who knows what could happen otherwise"
      );
    });
    it("should revert when minting without buying candies beforehand", async function () {
      const { userWithRunnerNoCandy } = await runnersAccessFixture();
      expect(
        userWithRunnerNoCandy.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [1].map(uint16ToBytes).join(""),
          "0x" + [0].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([1]),
          [1],
          [1]
        )
      ).to.be.revertedWith(
        "ERC1155: transfer caller is not owner nor approved"
      );
    });
    it("should revert when minting more user does not own enough candies", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [0].map(uint16ToBytes).join(""),
        "0x" + [0].map(uint16ToBytes).join(""),
        ethers.utils.hexlify([1]),
        [1],
        [1]
      );
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [2].map(uint16ToBytes).join(""),
          "0x" + [1].map(uint16ToBytes).join(""),
          ethers.utils.hexlify([1]),
          [1],
          [1]
        )
      ).to.be.revertedWith("ERC1155: burn amount exceeds balance");
    });
    it("should be able to mint their token", async function () {
      const { userWithRunner, ChainDreamers } = await runnersAccessFixture();
      const balanceBefore = await userWithRunner.CandyShop.balanceOf(
        userWithRunner.address,
        0
      );
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [0].map(uint16ToBytes).join(""),
        "0x" + [0].map(uint16ToBytes).join(""),
        ethers.utils.hexlify([0]),
        [0],
        [1]
      );
      const ownerOfZero = await ChainDreamers.ownerOf(0);
      expect(ownerOfZero).to.eq(userWithRunner.address);
      const balanceAfter = await userWithRunner.CandyShop.balanceOf(
        userWithRunner.address,
        0
      );
      expect(balanceBefore - balanceAfter).to.equal(1);
    });
    it("should be able to batch mint their tokens", async function () {
      const { userWithRunner, ChainDreamers } = await runnersAccessFixture();
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [0, 2, 3, 4].map(uint16ToBytes).join(""),
        "0x" + [0, 1, 2, 3].map(uint16ToBytes).join(""),
        ethers.utils.hexlify([0, 1, 2, 0]),
        [0, 1, 2, 0],
        [1, 1, 1, 1]
      );

      // Assert that the tokens are owned by the user using tokenOfOwnerByIndex
      let tokenId;
      const tokenIds = [];
      for (let i = 0; i < 4; i++) {
        tokenId = await ChainDreamers.tokenOfOwnerByIndex(
          userWithRunner.address,
          i
        );
        tokenIds.push(tokenId.toNumber());
      }
      expect(tokenIds).to.deep.eq([0, 2, 3, 4]);

      // Assert that the tokens are owner by the user using ownerOf
      let owner;
      for (tokenId of tokenIds) {
        owner = await ChainDreamers.ownerOf(tokenId);
        expect(owner).to.eq(userWithRunner.address);
      }

      // Assert that all the candies are burnt
      const balance = await userWithRunner.CandyShop.balanceOfBatch(
        Array(3).fill(userWithRunner.address),
        [0, 1, 2]
      );
      expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal([
        0, 0, 0,
      ]);
    });
  });
  describe("mintBatchPublicSale", async function () {
    it("should revert when minting is not open", async () => {
      const { users } = await setup();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join(""),
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith("Public sale not open");
    });
    it("should revert when not paying the right amount", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join(""),
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith("You have to pay the bail bond");
    });
    it("should revert when trying to mint more than allowed", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1, 2, 3, 5, 6].map(uint16ToBytes).join(""),
          "0x" + [0, 1, 2, 3, 5, 6].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.3") }
        )
      ).to.be.revertedWith("Your home is to small to welcome so many dreamers");
    });
    it("should revert when with not enough indexes", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          "0x" + [1].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.revertedWith(
        "ownerIndexes must have the same length as tokenIds"
      );
    });
    it("should revert when token indexes do not start from 0 for the first mint", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          "0x" + [1, 2].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.revertedWith(
        "The given ownerTokenIndexes do not start from the current owner count"
      );
    });
    it("should revert when token indexes do not start from previous index", async function () {
      const { users } = await runnersAccessFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + [0, 2].map(uint16ToBytes).join(""),
        "0x" + [0, 1].map(uint16ToBytes).join("")
      );
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [3, 4].map(uint16ToBytes).join(""),
          "0x" + [3, 4].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith(
        "The given ownerTokenIndexes do not start from the current owner count"
      );
    });
    it("should revert when token indexes are not a sequence", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          "0x" + [0, 0].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.revertedWith("ownerTokenIndexes must be a sequence");
    });
    it("should revert not be able to mint someone else's token", async () => {
      const { users } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + [0, 1].map(uint16ToBytes).join(""),
        "0x" + [0, 1].map(uint16ToBytes).join(""),
        { value: ethers.utils.parseEther("0.1") }
      );

      expect(
        users[1].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.revertedWith("ERC721: token already minted");
    });
    it("should be able to mint tokens", async () => {
      const { users, ChainDreamers } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + [0, 2, 3].map(uint16ToBytes).join(""),
        "0x" + [0, 1, 2].map(uint16ToBytes).join(""),
        { value: ethers.utils.parseEther("0.15") }
      );

      // Assert that the tokens are owned by the user using tokenOfOwnerByIndex
      let tokenId;
      const tokenIds = [];
      for (let i = 0; i < 3; i++) {
        tokenId = await ChainDreamers.tokenOfOwnerByIndex(users[0].address, i);
        tokenIds.push(tokenId.toNumber());
      }
      expect(tokenIds).to.deep.eq([0, 2, 3]);

      // Assert that the tokens are owned by the user using ownerOf
      let owner;
      for (tokenId of tokenIds) {
        owner = await ChainDreamers.ownerOf(tokenId);
        expect(owner).to.eq(users[0].address);
      }
    });
  });
  describe("withdraw", async () => {
    it("should not be able to withdraw funds", async () => {
      const { users } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + [0, 1].map(uint16ToBytes).join(""),
        "0x" + [0, 1].map(uint16ToBytes).join(""),
        { value: ethers.utils.parseEther("0.1") }
      );
      expect(users[0].ChainDreamers.withdraw()).to.be.reverted;
    });
  });
  describe("dreamers", async () => {
    it("should return the dreamer's dna with correct candy Id", async () => {
      const { userWithRunner, ChainDreamers } = await runnersAccessFixture();
      const runnerIds = [0, 2, 3, 4];
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + runnerIds.map(uint16ToBytes).join(""),
        "0x" + [0, 1, 2, 3].map(uint16ToBytes).join(""),
        ethers.utils.hexlify([0, 1, 2, 0]),
        [0, 1, 2, 0],
        [1, 1, 1, 1]
      );
      const candyIds = [];
      let dna;
      for (const dreamerId of runnerIds) {
        dna = await ChainDreamers.dreamers(dreamerId);
        candyIds.push(dna % 4);
      }
      expect(candyIds).to.deep.equal([0, 1, 2, 0]);
    });
  });
});
