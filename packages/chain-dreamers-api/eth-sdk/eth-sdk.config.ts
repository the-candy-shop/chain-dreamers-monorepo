import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const config: EthSdkConfig = {
  contracts: {
    mainnet: {
      runners: "0x97597002980134beA46250Aa0510C9B90d87A587",
    },
    rinkeby: {
      runners: "0x651534a85763beB8b6D04b86C96BE724a2D3b8cf",
      dreamers: "0xF5a17625871b26Da86B2153253b02E2dF0aa7f4e",
      dreamersRenderer: "0xB9b1150953B416cf21a84A95cF9278bBEd6B37C1",
    },
  },
  etherscanKey: process.env.ETHERSCAN_API_KEY,
};

export default config;
