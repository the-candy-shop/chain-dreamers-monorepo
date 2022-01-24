import { getS3Image } from "../utils/getS3Image";
import { getMainnetSdk, getRinkebySdk } from "../utils/getSdk";
import { renderSvg } from "../utils/renderSvg";
import { svgToPng } from "../utils/svgToPng";
import { storeS3Image } from "../utils/storeS3Image";

export const runnerToDreamer = async (event) => {
  const id = event.pathParameters.id;
  const noCache =
    event.queryStringParameters && event.queryStringParameters["no-cache"];

  const s3Image = await getS3Image("runnerToDreamer", id);

  if (s3Image && !noCache) {
    return {
      statusCode: 200,
      body: s3Image,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "image/png",
      },
    };
  }

  const mainnetSdk = getMainnetSdk();
  const rinkebySdk = getRinkebySdk();

  const runnerDna = await mainnetSdk.runners.getDna(id);

  if (runnerDna.isZero()) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Dreamer with id ${id} could not be found`,
      }),
    };
  }

  const fullDna = await rinkebySdk.dreamersRenderer.getDreamerFullDna(
    runnerDna,
    0
  );
  const tokenData = await rinkebySdk.dreamersRenderer.getTokenData(fullDna);

  const svg = renderSvg(tokenData);
  const pngBuffer = await svgToPng(svg, 500, 500);

  storeS3Image("runnerToDreamer", id, pngBuffer);

  return {
    statusCode: 200,
    body: pngBuffer.toString("base64"),
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
    },
  };
};
