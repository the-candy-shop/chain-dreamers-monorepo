import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const mainnetRpc = `http://localhost:8545/`;

const config: EthSdkConfig = {
  contracts: {
    mainnet: {
      runners: "0x172076E0166D1F9Cc711C77Adf8488051744980C",
      candyShop: "0x8198f5d8F8CfFE8f9C413d98a0A55aEB8ab9FbB7",
    },
  },
  rpc: {
    mainnet: mainnetRpc,
  },
};

export default config;
