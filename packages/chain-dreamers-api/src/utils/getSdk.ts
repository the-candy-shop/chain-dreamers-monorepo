import { ethers } from "ethers";
import {
  getMainnetSdk as mainnetSdk,
  getRinkebySdk as rinkebySdk,
} from "@dethcrypto/eth-sdk-client";

export const getRinkebySdk = () => {
  const rinkebyProvider = ethers.getDefaultProvider("rinkeby", {
    etherscan: process.env.ETHERSCAN_API_KEY,
    infura: process.env.INFURA_ID,
    alchemy: process.env.ALCHEMY_API_KEY,
    pocket: process.env.POCKET_APPLICATION_KEY,
  });
  const defaultSigner = ethers.Wallet.createRandom().connect(rinkebyProvider);

  return rinkebySdk(defaultSigner);
};

export const getMainnetSdk = () => {
  const mainnetProvider = ethers.getDefaultProvider("mainnet", {
    etherscan: process.env.ETHERSCAN_API_KEY,
    infura: process.env.INFURA_ID,
    alchemy: process.env.ALCHEMY_API_KEY,
    pocket: process.env.POCKET_APPLICATION_KEY,
  });
  const defaultSigner = ethers.Wallet.createRandom().connect(mainnetProvider);

  return mainnetSdk(defaultSigner);
};
