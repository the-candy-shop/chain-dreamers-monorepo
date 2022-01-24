import { ethers } from "ethers";
import {
  getMainSdk,
  getOriginalRunnerSdk as originalRunnerSdk,
} from "@dethcrypto/eth-sdk-client";

export const getOriginalRunnerSdk = () => {
  const rinkebyProvider = ethers.getDefaultProvider("mainnet", {
    etherscan: process.env.ETHERSCAN_API_KEY,
    infura: process.env.INFURA_ID,
    alchemy: process.env.ALCHEMY_API_KEY,
    pocket: process.env.POCKET_APPLICATION_KEY,
  });
  const defaultSigner = ethers.Wallet.createRandom().connect(rinkebyProvider);

  return originalRunnerSdk(defaultSigner);
};

export const getSdk = () => {
  const mainnetProvider = ethers.getDefaultProvider(process.env.NETWORK, {
    etherscan: process.env.ETHERSCAN_API_KEY,
    infura: process.env.INFURA_ID,
    alchemy: process.env.ALCHEMY_API_KEY,
    pocket: process.env.POCKET_APPLICATION_KEY,
  });
  const defaultSigner = ethers.Wallet.createRandom().connect(mainnetProvider);

  return getMainSdk(defaultSigner);
};
