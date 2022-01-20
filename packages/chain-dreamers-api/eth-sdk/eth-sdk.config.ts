import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const config: EthSdkConfig = {
  contracts: {
    mainnet: {
      runnersBaseRenderer: "0xfDac77881ff861fF76a83cc43a1be3C317c6A1cC",
      runners: "0x97597002980134beA46250Aa0510C9B90d87A587",
    },
  },
  etherscanKey: process.env.ETHERSCAN_API_KEY,
};

export default config;
