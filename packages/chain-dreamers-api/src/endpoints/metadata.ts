import { getSdk } from "../utils/getSdk";
import { getS3Json } from "../utils/getS3Json";
import { renderMetaData } from "../utils/renderMetaData";
import { storeS3Json } from "../utils/storeS3Json";
import { doesDreamerExist } from "./img";

export const metadata = async (event) => {
  const id = event.pathParameters.id;
  const noCache =
    event.queryStringParameters && event.queryStringParameters["no-cache"];

  const s3Json = await getS3Json("metadata", id);

  if (s3Json && !noCache) {
    return {
      statusCode: 200,
      body: s3Json,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }

  const sdk = getSdk();

  const dreamerExists = await doesDreamerExist(sdk, id);

  if (!dreamerExists) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Dreamer with id ${id} could not be found`,
      }),
    };
  }

  const dreamerDna = await sdk.ChainDreamers.dreamers(id);
  const runnerDna = await sdk.ChainRunners.getDna(id);

  const tokenData = await sdk.DreamersRenderer.getTokenData(
    runnerDna,
    dreamerDna
  );

  const metadata = renderMetaData(id, tokenData);

  storeS3Json("metadata", id, metadata);

  return {
    statusCode: 200,
    body: JSON.stringify(metadata),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
