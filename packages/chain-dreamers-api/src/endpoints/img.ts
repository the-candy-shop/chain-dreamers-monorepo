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

  const sdk = getSdk();

  const [s3Image, dreamerExists, runnerDna, dreamerDna] = await Promise.all([
    getS3Image("img", id),
    doesDreamerExist(sdk, id),
    sdk.ChainRunners.getDna(id),
    sdk.ChainDreamers.dreamers(id),
  ]);

  if (!dreamerExists) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Dreamer with id ${id} could not be found`,
      }),
    };
  }

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

  updateMintedDreamersList(parseInt(id));

  const tokenData = await sdk.DreamersRenderer.getTokenData(
    runnerDna,
    dreamerDna
  );

  const svg = renderSvg(tokenData);
  const pngBuffer = await svgToPng(svg, 500, 500);

  storeS3Image("img", id, pngBuffer);

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
