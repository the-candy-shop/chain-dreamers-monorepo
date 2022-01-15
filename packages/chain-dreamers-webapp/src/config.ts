import { ChainId } from "@usedapp/core";

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | ChainId.Hardhat;

export const CHAIN_ID: SupportedChains = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? "1"
);

export const INFURA_PROJECT_ID =
  process.env.REACT_APP_INFURA_PROJECT_ID ?? "ee2097faedca465fbbf6fe2344d76808";

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl("rinkeby"),
    wsRpcUri: createNetworkWsUrl("rinkeby"),
    subgraphApiUri:
      "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph-rinkeby-v4",
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === "true",
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl("mainnet"),
    wsRpcUri: createNetworkWsUrl("mainnet"),
    subgraphApiUri:
      "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph",
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === "true",
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: "http://localhost:8545",
    wsRpcUri: "ws://localhost:8545",
    subgraphApiUri: "",
    enableHistory: false,
  },
};

const config = {
  app: app[CHAIN_ID],
};

export default config;