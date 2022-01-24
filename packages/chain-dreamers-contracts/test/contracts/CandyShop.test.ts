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
        expect(res.id).to.equal(index);
        expect(res.price.toString()).to.equal(
          ethers.utils.parseEther(sku.price.toString())
        );
        expect(res.name).to.equal(sku.name);
      });
    });
  });
  describe("mint", function () {
    it("should revert when the sku does not exists", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP]);
      await expect(users[0].CandyShop.mint(0, 1)).to.be.revertedWith(
        "This candy does not exist yet"
      );
    });
    skus.map(async (sku, index) => {
      it(`should revert mint ${sku.name} with no value`, async function () {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        expect(users[0].CandyShop.mint(index, 10)).to.be.revertedWith(
          "You have to pay the price to eat candies"
        );
      });
      it(`should mint ${sku.name}`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mint(index, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        const balance = await CandyShop.balanceOf(users[0].address, index);
        expect(balance).to.equal(10);
      });
    });
  });
  describe("burn", async function () {
    it("should revert when the sku does not exist", async () => {
      const { users } = await setup([TAGS.CANDY_SHOP]);
      expect(users[0].CandyShop.burn(users[0].address, 0, 1)).to.be.reverted;
    });
    skus.map(async (sku, index) => {
      it(`should revert when burning more than owned ${sku.name}`, async function () {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mint(index, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        expect(users[0].CandyShop.burn(users[0].address, index, 15)).to.be
          .reverted;
      });
      it(`should burn ${sku.name}`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mint(index, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        await users[0].CandyShop.burn(users[0].address, index, 5);
        const balance = await CandyShop.balanceOf(users[0].address, index);
        expect(balance).to.equal(5);
      });
      it(`should not burn ${sku.name} when not approved`, async function () {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mint(index, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        expect(users[1].CandyShop.burn(users[0].address, index, 5)).to.be
          .reverted;
      });
      it(`should burn ${sku.name} when approved`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mint(index, 10, {
          value: ethers.utils.parseEther(sku.price.toString()).mul(10),
        });
        await users[0].CandyShop.setApprovalForAll(users[1].address, true);
        await users[1].CandyShop.burn(users[0].address, index, 5);
        const balance = await CandyShop.balanceOf(users[0].address, index);
        expect(balance).to.equal(5);
      });
    });
  });
  describe("batch", async function () {
    const tokenIds = [...Array(skus.length).keys()];
    const amounts = tokenIds.map((id) => 10 * id + 1);
    const value = ethers.utils.parseEther(
      skus
        .map((sku, index) => sku.price * amounts[index])
        .reduce((i, j) => i + j)
        .toFixed(3)
        .toString()
    );
    describe("mint", function () {
      it("should revert when one of the skus does not exist", async () => {
        const { users } = await setup([TAGS.CANDY_SHOP]);
        expect(users[0].CandyShop.mintBatch([0], [1])).to.be.revertedWith(
          "This candy does not exist yet"
        );
      });
      it(`should revert mint with incorrect value`, async function () {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        expect(
          users[0].CandyShop.mintBatch(tokenIds, amounts)
        ).to.be.revertedWith("You have to pay the price to eat candies");
      });
      it(`should mintBatch all skus`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mintBatch(tokenIds, amounts, { value });
        const balance = await CandyShop.balanceOfBatch(
          Array(skus.length).fill(users[0].address),
          tokenIds
        );
        expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal(
          amounts
        );
      });
    });
    describe("burn", function () {
      it("should revert when one of the skus does not exist", async () => {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        expect(
          users[0].CandyShop.burnBatch(users[0].address, [skus.length], [1])
        ).to.be.reverted;
      });
      it(`should burnBatch all skus`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mintBatch(tokenIds, amounts, { value });
        await users[0].CandyShop.burnBatch(users[0].address, tokenIds, amounts);
        const balance = await CandyShop.balanceOfBatch(
          Array(skus.length).fill(users[0].address),
          tokenIds
        );
        expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal(
          Array(skus.length).fill(0)
        );
      });
      it(`should not burnBatch when not approved`, async function () {
        const { users } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mintBatch(tokenIds, amounts, { value });
        expect(
          users[0].CandyShop.burnBatch(users[0].address, tokenIds, amounts)
        ).to.be.reverted;
      });
      it(`should burnBatch when approved`, async function () {
        const { users, CandyShop } = await setup([TAGS.CANDY_SHOP_INVENTORY]);
        await users[0].CandyShop.mintBatch(tokenIds, amounts, { value });
        await users[0].CandyShop.setApprovalForAll(users[1].address, true);
        await users[1].CandyShop.burnBatch(users[0].address, tokenIds, amounts);
        const balance = await CandyShop.balanceOfBatch(
          Array(skus.length).fill(users[0].address),
          tokenIds
        );
        expect(balance.map((b: BigNumber) => b.toNumber())).to.deep.equal(
          Array(skus.length).fill(0)
        );
      });
    });
  });
});
