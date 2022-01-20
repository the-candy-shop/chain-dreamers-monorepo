import { setupUser, setupUsers } from "./utils";
import chai from "chai";
import {
  deployments,
  ethers,
  getNamedAccounts,
  getUnnamedAccounts,
} from "hardhat";
import { loadSkus, TAGS } from "../../utils/constants";
import { BigNumber } from "ethers";
import { solidity } from "ethereum-waffle";

chai.use(solidity);
const { expect } = chai;

async function setup(tags: string[]) {
  await deployments.fixture(tags);
  const contracts = {
    CandyShop: await ethers.getContract("CandyShop"),
  };
  const { deployer } = await getNamedAccounts();
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
    deployer: await setupUser(deployer, contracts),
  };
}

describe("CandyShop", function () {
  const skus = loadSkus();
  describe("inventory", async function () {
    skus.map(async (sku, index) => {
      it(`should have ${sku.name} in inventory`, async function () {
        const { CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        const res = await CandyShop.inventory(index);
        expect(res.price.toString()).to.equal(
          ethers.utils.parseEther(sku.price.toString())
        );
        expect(res.supply).to.equal(sku.supply);
        expect(res.name).to.equal(sku.name);
        expect(res.circulating).to.equal(0);
        expect(res.id).to.equal(index);
      });
    });
  });
  describe("mint", function () {
    it("should revert when no sku exists", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP]);
      await expect(users[0].CandyShop.mint("", 1)).to.be.revertedWith(
        "The candy shop is empty"
      );
    });
    it("should revert when the sku does not exist", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      expect(
        users[0].CandyShop.mint("THIS_SKU_DOES_NOT_EXIST", 1)
      ).to.be.revertedWith("This candy does not exist yet");
    });
    skus.map(async (sku, index) => {
      it(`should revert mint ${sku.name} with no value`, async function () {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        expect(users[0].CandyShop.mint(sku.name, 10)).to.be.revertedWith(
          "You have to pay the price to eat candies"
        );
      });
      it(`should mint ${sku.name}`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        let balance;
        balance = await CandyShop.balanceOf(users[0].address, index);
        expect(balance).to.equal(0);
        await users[0].CandyShop.mint(sku.name, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        balance = await CandyShop.balanceOf(users[0].address, index);
        expect(balance).to.equal(10);
      });
    });
  });
  describe("mintBatch", function () {
    it("should revert when no sku exists", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP]);
      await expect(users[0].CandyShop.mintBatch([""], [1])).to.be.revertedWith(
        "The candy shop is empty"
      );
    });
    it("should revert when one of the skus does not exist", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      expect(
        users[0].CandyShop.mintBatch(["THIS_SKU_DOES_NOT_EXIST"], [1])
      ).to.be.revertedWith("This candy does not exist yet");
    });
    it(`should revert mint with incorrect value`, async function () {
      const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      expect(
        users[0].CandyShop.mintBatch(
          skus.map((sku) => sku.name),
          skus.map((sku, index) => 10 * index + 1)
        )
      ).to.be.revertedWith("You have to pay the price to eat candies");
    });
    it(`should mintBatch all skus`, async function () {
      const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      let balance;
      balance = await CandyShop.balanceOfBatch(
        Array(skus.length).fill(users[0].address),
        [...Array(skus.length).keys()]
      );
      expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal(
        Array(skus.length).fill(0)
      );
      const value = skus
        .map((sku, index) => sku.price * (10 * index + 1))
        .reduce((i, j) => i + j)
        .toFixed(3)
        .toString();
      await users[0].CandyShop.mintBatch(
        skus.map((sku) => sku.name),
        skus.map((sku, index) => 10 * index + 1),
        {
          value: ethers.utils.parseEther(value),
        }
      );
      balance = await CandyShop.balanceOfBatch(
        Array(skus.length).fill(users[0].address),
        [...Array(skus.length).keys()]
      );
      expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal(
        skus.map((sku, index) => 10 * index + 1)
      );
    });
  });
  describe("burn", async function () {
    it("should revert when no sku exists", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP]);
      await expect(users[0].CandyShop.burn("", 1)).to.be.revertedWith(
        "The candy shop is empty"
      );
    });
    it("should revert when the sku does not exist", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      expect(
        users[0].CandyShop.burn("THIS_SKU_DOES_NOT_EXIST", 1)
      ).to.be.revertedWith("This candy does not exist yet");
    });
    skus.map(async (sku, index) => {
      it(`should burn ${sku.name}`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mint(sku.name, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        await users[0].CandyShop.burn(sku.name, 5);
        const balance = await CandyShop.balanceOf(users[0].address, index);
        expect(balance).to.equal(5);
      });
    });
  });
  describe("burnBatch", function () {
    it("should revert when no sku exists", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP]);
      await expect(users[0].CandyShop.burnBatch([""], [1])).to.be.revertedWith(
        "The candy shop is empty"
      );
    });
    it("should revert when one of the skus does not exist", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      expect(
        users[0].CandyShop.burnBatch(["THIS_SKU_DOES_NOT_EXIST"], [1])
      ).to.be.revertedWith("This candy does not exist yet");
    });
    it(`should burnBatch all skus`, async function () {
      const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
      const value = skus
        .map((sku, index) => sku.price * (10 * index + 1))
        .reduce((i, j) => i + j)
        .toFixed(3)
        .toString();
      await users[0].CandyShop.mintBatch(
        skus.map((sku) => sku.name),
        skus.map((sku, index) => 10 * index + 1),
        {
          value: ethers.utils.parseEther(value),
        }
      );
      await users[0].CandyShop.burnBatch(
        skus.map((sku) => sku.name),
        skus.map((sku, index) => 10 * index)
      );
      const balance = await CandyShop.balanceOfBatch(
        Array(skus.length).fill(users[0].address),
        [...Array(skus.length).keys()]
      );
      expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal(
        Array(skus.length).fill(1)
      );
    });
  });
});
