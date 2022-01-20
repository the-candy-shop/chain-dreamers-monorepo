import { ethers } from "ethers";
import * as valise from "./valise.json";
import * as contract from "./export-all.json";

const networkChainIds = {
  rinkeby: "4",
};

const network = process.env.NETWORK || "rinkeby";
const chainId = networkChainIds[network];

const Provider = ethers.getDefaultProvider(process.env.NETWORK, {
  infura: process.env.INFURA_ID,
  etherscan: process.env.ETHERSCAN_API_KEY,
  alchemy: process.env.ALCHEMY_API_KEY,
  pocket: process.env.POCKET_APPLICATION_KEY,
});
const Signer = ethers.Wallet.createRandom().connect(Provider);

const runnersContractData =
  contract[chainId][network].contracts["ChainRunners"];
const dreamersRendererContractData =
  contract[chainId][network].contracts["DreamersRenderer"];

const RunnersContract = new ethers.Contract(
  runnersContractData.address,
  runnersContractData.abi,
  Signer
);

const DreamersRendererContract = new ethers.Contract(
  dreamersRendererContractData.address,
  dreamersRendererContractData.abi,
  Signer
);

export const hello = async (event) => {
  const id = event.pathParameters.id;

  const dna = await RunnersContract.getDna(id);
  console.log("dna", dna);

  const tokenData = await DreamersRendererContract.getTokenData(dna);
  console.log("tokenData", tokenData);

  let svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 255" width="500px" height="500px">';

  for (const id of tokenData) {
    if (valise[id]) {
      svg += valise[id];
    }
  }

  svg += "</svg>";

  return {
    statusCode: 200,
    body: svg,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  };
};
