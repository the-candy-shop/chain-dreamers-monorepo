import { BigNumber, ethers, utils } from "ethers";
import { getMainnetSdk } from "@dethcrypto/eth-sdk-client";
import * as valise from "./valise.json";

export const hello = async (event) => {
  const mainnetProvider = ethers.getDefaultProvider("mainnet", {
    infura: process.env.INFURA_ID,
    etherscan: process.env.ETHERSCAN_API_KEY,
    alchemy: process.env.ALCHEMY_API_KEY,
    pocket: process.env.POCKET_APPLICATION_KEY,
  });
  const defaultSigner = ethers.Wallet.createRandom().connect(mainnetProvider);
  const sdk = getMainnetSdk(defaultSigner);
  const id = event.pathParameters.id;

  const dna = await sdk.runners.getDna(id);
  console.log("dna", dna);

  const [layerStructure] = await sdk.runnersBaseRenderer.getTokenData(dna);

  for (const layer of layerStructure) {
    console.log("hexString", layer.hexString);
  }

  let svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 283.5">';

  /* for (const id of ids) {
    if (valise[id]) {
      svg += valise[id];
    }
  } */

  svg += "</svg>";

  return {
    statusCode: 200,
    body: svg,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  };
};
