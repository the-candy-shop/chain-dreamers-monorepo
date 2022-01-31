import { getS3Image } from "../utils/getS3Image";
import { getSdk } from "../utils/getSdk";
import { renderSvg } from "../utils/renderSvg";
import { svgToPng } from "../utils/svgToPng";
import { storeS3Image } from "../utils/storeS3Image";
import { updateMintedDreamersList } from "../utils/updateMintedDreamersList";

export const img = async (event) => {
  const id = event.pathParameters.id as string;
  const noCache =
    event.queryStringParameters && event.queryStringParameters["no-cache"];

  const s3Image = await getS3Image("img", id);

  if (s3Image && !noCache) {
    return {
      statusCode: 200,
      body: s3Image,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "image/png",
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

  const runnerDna = await sdk.ChainRunners.getDna(id);
  const dreamerDna = await sdk.ChainDreamers.dreamers(id);

  const tokenData = await sdk.DreamersRenderer.getTokenData(
    runnerDna,
    dreamerDna
  );

  const svg = renderSvg(tokenData);
  const pngBuffer = await svgToPng(svg, 500, 500);

  storeS3Image("img", id, pngBuffer);
  updateMintedDreamersList(parseInt(id));

  return {
    statusCode: 200,
    body: pngBuffer.toString("base64"),
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};

export async function doesDreamerExist(sdk, id: string): Promise<boolean> {
  try {
    const tokenURI = await sdk.ChainDreamers.tokenURI(id);

    return !!tokenURI;
  } catch {
    return false;
  }
}
