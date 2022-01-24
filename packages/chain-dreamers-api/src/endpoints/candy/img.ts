import { getS3Image } from "../../utils/getS3Image";

export const img = async (event) => {
  const id = event.pathParameters.id;

  const s3Image = await getS3Image("candy-shop/img", id);

  if (!s3Image) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Candy with id ${id} could not be found`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: s3Image,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/png",
    },
  };
};
