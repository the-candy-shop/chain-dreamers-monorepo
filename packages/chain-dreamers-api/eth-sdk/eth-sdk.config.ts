import type { EthSdkConfig } from "@dethcrypto/eth-sdk";
import { extractContractAddresses } from "../scripts/extract-contract-addresses";

const NETWORK = process.env.NETWORK || "rinkeby";
const contracts = extractContractAddresses(NETWORK);

const mainRpc = `https://${NETWORK}.infura.io/v3/${process.env.INFURA_ID}`;
const etherscanURL =
  NETWORK === "rinkeby"
    ? "https://api-rinkeby.etherscan.io/api"
    : "https://api.etherscan.io/api";

const originalRunnerRpc = `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`;
const originalRunnerEtherscanURL = "https://api.etherscan.io/api";

if (process.env.RUNNERS_CONTRACT_ADDRESS) {
  contracts.ChainRunners = process.env.RUNNERS_CONTRACT_ADDRESS;
}

const config: EthSdkConfig = {
  contracts: {
    main: contracts as Record<string, `0x${string}`>,
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
