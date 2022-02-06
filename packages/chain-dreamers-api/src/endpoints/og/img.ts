import { getS3Image } from "../../utils/getS3Image";

export const img = async () => {
  const s3Image = await getS3Image("og/img", "1");

  if (!s3Image) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Og image could not be found`,
      }),
    };
  }

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
};
