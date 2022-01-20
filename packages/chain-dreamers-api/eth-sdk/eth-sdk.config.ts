import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const config: EthSdkConfig = {
  contracts: {
    mainnet: {
      runnersBaseRenderer: "0xfDac77881ff861fF76a83cc43a1be3C317c6A1cC",
      runners: "0x97597002980134beA46250Aa0510C9B90d87A587",
    },
    rinkeby: {
      runners: "0x8756eD53f41883A6cEE38C15D775ec2604722869",
      dreamers: "0xd767Fb9f8a338C91fB9B5e29ecD8Cf9af7C2B630",
    },
  },
  etherscanKey: process.env.ETHERSCAN_API_KEY,
};

export default config;
