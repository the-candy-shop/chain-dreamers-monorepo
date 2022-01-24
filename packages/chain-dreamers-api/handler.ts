import { getRinkebySdk, getMainnetSdk } from "./src/utils/getSdk";
import { renderSvg } from "./src/utils/renderSvg";
import { svgToPng } from "./src/utils/svgToPng";

export const img = async (event) => {
  const id = event.pathParameters.id;

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
  const png = await svgToPng(svg, 500, 500);

  return {
    statusCode: 200,
    body: png,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
    },
  };
};

export const runnerToDreamer = async (event) => {
  const id = event.pathParameters.id;
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
  const png = await svgToPng(svg, 500, 500);

  return {
    statusCode: 200,
    body: png,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
    },
  };
};
