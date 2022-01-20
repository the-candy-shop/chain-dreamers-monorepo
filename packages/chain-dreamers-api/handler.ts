import { ethers } from "ethers";
import * as valise from "./valise.json";

const DreamersAbi = [
  "function getTokenData(uint256 _dna) public view returns (uint16[13] memory traitIndexes)",
];
const RunnersAbi = [
  "function getDna(uint256 _tokenId) external view returns (uint256)",
];

const Provider = ethers.getDefaultProvider(process.env.NETWORK, {
  infura: process.env.INFURA_ID,
  etherscan: process.env.ETHERSCAN_API_KEY,
  alchemy: process.env.ALCHEMY_API_KEY,
  pocket: process.env.POCKET_APPLICATION_KEY,
});
const Signer = ethers.Wallet.createRandom().connect(Provider);

const RunnersContract = new ethers.Contract(
  process.env.RUNNER_CONTRACT_ADDRESS || "",
  RunnersAbi,
  Signer
);

const DreamersRendererContract = new ethers.Contract(
  process.env.DREAMERS_RENDERER_ADDRESS || "",
  DreamersAbi,
  Signer
);

export const hello = async (event) => {
  const id = event.pathParameters.id;

  const dna = await RunnersContract.getDna(id);
  console.log("dna", dna);

  const tokenData = await DreamersRendererContract.getTokenData(dna);
  console.log("tokenData", tokenData);

  let svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 283.5">';

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
