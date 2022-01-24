import type { EthSdkConfig } from "@dethcrypto/eth-sdk";

const mainRpc = `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_ID}`;
const etherscanURL =
  process.env.NETWORK === "rinkeby"
    ? "https://api-rinkeby.etherscan.io/api"
    : "https://api.etherscan.io/api";

const originalRunnerRpc = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;
const originalRunnerEtherscanURL = "https://api.etherscan.io/api";

const config: EthSdkConfig = {
  contracts: {
    main: {
      runners: process.env.RUNNERS_CONTRACT_ADDRESS as `0x${string}`,
      dreamers: process.env.DREAMERS_CONTRACT_ADDRESS as `0x${string}`,
      dreamersRenderer: process.env
        .DREAMERS_RENDERER_CONTRACT_ADDRESS as `0x${string}`,
    },
    originalRunner: {
      runners: process.env.RUNNERS_ORIGINAL_CONTRACT_ADDRESS as `0x${string}`,
    },
  },
  etherscanURLs: {
    main: etherscanURL,
    originalRunner: originalRunnerEtherscanURL,
  },
  etherscanKey: process.env.ETHERSCAN_API_KEY,
  rpc: {
    main: mainRpc,
    originalRunner: originalRunnerRpc,
  },
};

export default config;
