import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "inter-ui/inter.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ChainId, DAppProvider } from "@usedapp/core";
import { CHAIN_ID, createNetworkHttpUrl } from "./config";

const Buffer = require("buffer/").Buffer;
global.Buffer = Buffer;

const useDappConfig = {
  readOnlyChainId: CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Rinkeby]: createNetworkHttpUrl("rinkeby"),
    [ChainId.Mainnet]: createNetworkHttpUrl("mainnet"),
    [ChainId.Hardhat]: "http://localhost:8545",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3ReactProvider
        getLibrary={
          (provider) => new Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
        }
      >
        <DAppProvider config={useDappConfig}>
          <App />
        </DAppProvider>
      </Web3ReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
