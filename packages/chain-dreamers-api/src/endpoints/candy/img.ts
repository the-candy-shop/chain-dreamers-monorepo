import { getS3Image } from "../../utils/getS3Image";
import { BigNumber } from "ethers";

export const img = async (event) => {
  const id = BigNumber.from(`0x${event.pathParameters.id}`);

  const s3Image = await getS3Image("candy-shop/img", id.toString());

  if (!s3Image) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Candy with id ${id.toString()} could not be found`,
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
