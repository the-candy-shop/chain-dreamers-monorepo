import { getRinkebySdk, getMainnetSdk } from "./src/utils/getSdk";
import { renderSvg } from "./src/utils/renderSvg";
import { svgToPng } from "./src/utils/svgToPng";
import { getS3Image } from "./src/utils/getS3Image";
import { storeS3Image } from "./src/utils/storeS3Image";

export const img = async (event) => {
  const id = event.pathParameters.id;
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
      },
    };
  }

  const sdk = getRinkebySdk(); // TODO: change to adapt to env var

  const runnerDna = await sdk.runners.getDna(id);

  if (runnerDna.isZero()) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Dreamer with id ${id} could not be found`,
      }),
    };
  }

  const fullDna = await sdk.dreamersRenderer.getDreamerFullDna(runnerDna, 0); // TODO: replace 0 with dreamer value
  const tokenData = await sdk.dreamersRenderer.getTokenData(fullDna);

  const svg = renderSvg(tokenData);
  const pngBuffer = await svgToPng(svg, 288, 288);

  storeS3Image("img", id, pngBuffer);

  return {
    statusCode: 200,
    body: pngBuffer.toString("base64"),
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
    },
  };
};

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
  const pngBuffer = await svgToPng(svg, 288, 288);

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
