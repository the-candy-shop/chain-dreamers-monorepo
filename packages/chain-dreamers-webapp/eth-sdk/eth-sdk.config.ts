import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const mainRpc =
  process.env.REACT_APP_NETWORK === "localhost"
    ? "http://localhost:8545/"
    : `https://${process.env.REACT_APP_NETWORK}.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`;

const etherscanURL =
  process.env.REACT_APP_NETWORK === "rinkeby"
    ? "https://api-rinkeby.etherscan.io/api"
    : "https://api.etherscan.io/api";

const config: EthSdkConfig = {
  contracts: {
    main: {
      runners: process.env.REACT_APP_RUNNERS_CONTRACT_ADDRESS as `0x${string}`,
      dreamers: process.env
        .REACT_APP_DREAMERS_CONTRACT_ADDRESS as `0x${string}`,
      candyShop: process.env
        .REACT_APP_CANDY_SHOP_CONTRACT_ADDRESS as `0x${string}`,
    },
  },
  etherscanURLs:
    process.env.REACT_APP_NETWORK !== "localhost"
      ? {
          main: etherscanURL,
        }
      : undefined,
  rpc: {
    main: mainRpc,
  },
};

export default config;
