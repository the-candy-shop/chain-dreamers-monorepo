import { getS3Json } from "../../utils/getS3Json";

export const img = async (event) => {
  const id = event.pathParameters.id;

  const s3Json = await getS3Json("candy-shop/metadata", id);

  if (!s3Json) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Candy with id ${id} could not be found`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: s3Json,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
    },
  };
};
