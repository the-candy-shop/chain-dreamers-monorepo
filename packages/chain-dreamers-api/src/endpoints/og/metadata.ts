import { getS3Json } from "../../utils/getS3Json";

export const metadata = async () => {
  const s3Json = await getS3Json("og/metadata", "1");

  if (!s3Json) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Og metadata could not be found`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: s3Json,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
