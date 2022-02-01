import { setupUser, setupUsers } from "./utils";
import chai from "chai";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
  network,
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
    TAGS.DREAMERS_PALETTES,
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
  await contractsAndUsers.userWithRunner.ChainRunners.mint(25);
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
  await network.provider.send("evm_mine");
  await network.provider.send("evm_mine");
  return contractsAndUsers;
});

describe("ChainDreamers", function () {
  describe("mintBatchRunnersAccess", async function () {
    it("should revert when candy Ids and token ids length do not match", async () => {
      const { users } = await runnersAccessFixture();
      expect(
        users[0].ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          [0, 1],
          [1, 1]
        )
      ).to.be.revertedWith("Each runner needs one and only one candy");
    });
    it("should revert when user tries to mint a runner he doesn't own", async function () {
      const { userWithoutRunner } = await runnersAccessFixture();
      expect(
        userWithoutRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [1].map(uint16ToBytes).join(""),
          [1],
          [1]
        )
      ).to.be.revertedWith(
        "You cannot give candies to a runner that you do not own"
      );
    });
    it("should revert when candy amount does not equal 1", async () => {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
          [0],
          [2]
        )
      ).to.be.revertedWith(
        "Your runner needs one and only one candy, who knows what could happen otherwise"
      );
    });
    it("should revert when trying to mint twice the same token", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [0].map(uint16ToBytes).join(""),
        [0],
        [1]
      );
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0, 2].map(uint16ToBytes).join(""),
          [0, 2],
          [1, 1]
        )
      ).to.be.revertedWith("ERC721: token already exists");
    });
    it("should revert when minting without burning candies", async function () {
      const { userWithRunner } = await runnersAccessFixture();
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [0].map(uint16ToBytes).join(""),
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
        [1],
        [1]
      );
      expect(
        userWithRunner.ChainDreamers.mintBatchRunnersAccess(
          "0x" + [2].map(uint16ToBytes).join(""),
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
      const tokenId = 25;
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + [tokenId].map(uint16ToBytes).join(""),
        [0],
        [1]
      );
      const ownerOfZero = await ChainDreamers.ownerOf(tokenId);
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
    it("should be able to batch mint 100 tokens", async () => {
      const { users, ChainDreamers } = await setup();
      const tokenIds = [...Array(100).keys()];
      const tokenIdsBytes = "0x" + tokenIds.map(uint16ToBytes).join("");
      const candyIds = [...Array(100).fill(0)];
      const candyAmounts = [...Array(100).fill(1)];
      await Promise.all(
        tokenIds.map((tokenId) => users[0].ChainRunners.mint(tokenId))
      );
      await users[0].CandyShop.mintBatch(candyIds, candyAmounts, {
        value: ethers.utils.parseEther("3"),
      });
      await users[0].ChainDreamers.mintBatchRunnersAccess(
        tokenIdsBytes,
        candyIds,
        candyAmounts
      );
      const balance = await ChainDreamers.balanceOf(users[0].address);
      expect(balance.toNumber()).to.equal(100);
    });
  });
  describe("mintBatchPublicSale", async function () {
    it("should revert when minting is not open", async () => {
      const { users } = await setup();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith("Public sale not open");
    });
    it("should revert when not paying the right amount", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith("You have to pay the bail bond");
    });
    it("should revert when trying to mint more than allowed", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1, 2, 3, 5, 6].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.3") }
        )
      ).to.be.revertedWith("Your home is to small to welcome so many dreamers");
    });
    it("should revert when trying to mint twice the same token", async () => {
      const { users } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + [0, 1].map(uint16ToBytes).join(""),
        { value: ethers.utils.parseEther("0.1") }
      );

      expect(
        users[1].ChainDreamers.mintBatchPublicSale(
          "0x" + [0, 1].map(uint16ToBytes).join(""),
          { value: ethers.utils.parseEther("0.1") }
        )
      ).to.be.revertedWith("ERC721: token already exists");
    });
    it("should be able to mint tokens", async () => {
      const { users, ChainDreamers } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + [0, 2, 3].map(uint16ToBytes).join(""),
        { value: ethers.utils.parseEther("0.15") }
      );

      // Assert that the tokens are owned by the user using tokenOfOwnerByIndex
      const tokenIds = await Promise.all(
        [...Array(3).keys()].map(
          async (i) =>
            await ChainDreamers.tokenOfOwnerByIndex(users[0].address, i)
        )
      );
      expect(tokenIds.map((i) => i.toNumber())).to.deep.eq([0, 2, 3]);

      // Assert that the tokens are owned by the user using ownerOf
      const owners = await Promise.all(
        tokenIds.map(async (tokenId) => await ChainDreamers.ownerOf(tokenId))
      );
      expect(owners).to.deep.eq(Array(tokenIds.length).fill(users[0].address));
    });
  });
  describe("mintBatchFounders", async function () {
    it("should revert when minting is not open", async () => {
      const { deployer } = await setup();
      expect(
        deployer.ChainDreamers.mintBatchFounders(
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith("Public sale not open");
    });
    it("should revert when minter is not owner", async () => {
      const { users } = await publicSaleFixture();
      expect(
        users[0].ChainDreamers.mintBatchFounders(
          "0x" + [0, 1, 2, 3].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
    it("should revert when trying to mint to many tokens", async () => {
      const { deployer } = await publicSaleFixture();
      expect(
        deployer.ChainDreamers.mintBatchFounders(
          "0x" + [...Array(51).keys()].map(uint16ToBytes).join("")
        )
      ).to.be.revertedWith(
        "Even if you are a founder, you don't deserve that many Dreamers"
      );
    });
    it("should be able to mint", async () => {
      const { deployer } = await setup();
      await deployer.ChainDreamers.setPublicSaleTimestamp(1);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      await deployer.ChainDreamers.mintBatchFounders(
        "0x" + [...Array(50).keys()].map(uint16ToBytes).join("")
      );
      const balance = await deployer.ChainDreamers.balanceOf(deployer.address);
      expect(balance.toNumber()).to.equal(50);
    });
    it("should not be able to mint twice", async () => {
      const { deployer } = await setup();
      await deployer.ChainDreamers.setPublicSaleTimestamp(1);
      await network.provider.send("evm_mine");
      await network.provider.send("evm_mine");
      await deployer.ChainDreamers.mintBatchFounders("0x0000");
      expect(
        deployer.ChainDreamers.mintBatchFounders("0x0001")
      ).to.be.revertedWith("Don't be too greedy");
    });
  });
  describe("withdraw", async () => {
    it("should not be able to withdraw funds", async () => {
      const { users } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
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
      const candyIdsExpected = [0, 1, 2, 0];
      await userWithRunner.ChainDreamers.mintBatchRunnersAccess(
        "0x" + runnerIds.map(uint16ToBytes).join(""),
        candyIdsExpected,
        [1, 1, 1, 1]
      );
      const candyIds = [];
      let dna;
      for (const dreamerId of runnerIds) {
        dna = await ChainDreamers.dreamersCandies(dreamerId);
        candyIds.push(dna % 4);
      }
      expect(candyIds).to.deep.equal(candyIdsExpected);
    });
  });
  describe("tokenURI", async () => {
    const tokenIds = [...Array(5).keys()];
    it(`should revert when token id does not exist`, async () => {
      const { ChainDreamers } = await publicSaleFixture();
      tokenIds.forEach((tokenId) => {
        expect(ChainDreamers.tokenURI(tokenId)).to.be.revertedWith(
          "ERC721: URI query for nonexistent token"
        );
      });
    });
    it(`should return metadata url with tokenId`, async () => {
      const { users, ChainDreamers } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale(
        "0x" + tokenIds.map(uint16ToBytes).join(""),
        {
          value: ethers.utils.parseEther(
            (0.05 * tokenIds.length).toFixed(2).toString()
          ),
        }
      );

      const uris = await Promise.all(
        tokenIds.map(async (tokenId) => {
          return await ChainDreamers.tokenURI(tokenId);
        })
      );
      expect(uris).to.deep.equal(
        tokenIds.map(
          (tokenId) =>
            `https://api.chaindreamers.xyz/test/tokens/${tokenId}/metadata`
        )
      );
    });
  });
  describe("getTokenExists", async () => {
    it("should return an array with true at index of given minted token", async () => {
      const { users, ChainDreamers } = await publicSaleFixture();
      await users[0].ChainDreamers.mintBatchPublicSale("0x000a00ff0000", {
        value: ethers.utils.parseEther((0.15).toString()),
      });
      const tokenExists = await ChainDreamers.getTokenExists();
      expect(
        tokenExists.reduce((acc: number, exists: number) => acc + exists)
      ).to.equal(3);
      expect(tokenExists[0]).to.be.true;
      expect(tokenExists[10]).to.be.true;
      expect(tokenExists[255]).to.be.true;
    });
  });
});
