import { ethers } from "ethers";
import { getMainnetSdk } from "@dethcrypto/eth-sdk-client";
import * as valise from "./valise.json";

const TRAITS_ORDER = [
  "BACKGROUND",
  "RACE",
  "FACE",
  "MOUTH",
  "NOSE",
  "EYES",
  "EAR_ACCESSORY",
  "FACE_ACCESSORY",
  "MASK",
  "HEAD_BELOW",
  "EYES_ACCESSORY",
  "HEAD_ABOVE",
  "MOUTH_ACCESSORY",
];

export const hello = async (event) => {
  const mainnetProvider = ethers.getDefaultProvider("mainnet", {
    infura: process.env.INFURA_ID,
  });
  const defaultSigner = ethers.Wallet.createRandom().connect(mainnetProvider);
  const sdk = getMainnetSdk(defaultSigner);
  const id = event.pathParameters.id;

  const tokenUri = await sdk.runners.tokenURI(id);
  const base64Data = tokenUri.split(",")[1];

  if (!base64Data) {
    return {
      statusCode: 404,
    };
  }

  const buff = Buffer.from(base64Data, "base64");
  const data = JSON.parse(buff.toString("ascii"));

  const attributes = data.attributes;
  console.log("Runner attributes", data.attributes);

  let svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 283.5">';

  TRAITS_ORDER.forEach((traitName) => {
    const attribute = attributes.find((attr) => {
      return (
        attr.trait_type.trim().replace(/ /g, "_").toUpperCase() === traitName
      );
    });

    if (attribute) {
      const traitValue = attribute.value.trim().replace(/ /g, "");

      if (valise[traitName] && valise[traitName][traitValue]) {
        svg += valise[traitName][traitValue];
      } else {
        console.warn("Missing trait in valise", traitName, traitValue);
      }
    }
  });

  svg += "</svg>";

  return {
    statusCode: 200,
    body: svg,
    headers: {
      "Content-Type": "image/svg+xml",
    },
  };
};
