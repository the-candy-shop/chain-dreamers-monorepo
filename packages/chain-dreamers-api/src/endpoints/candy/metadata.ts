import { getS3Json } from "../../utils/getS3Json";
import { BigNumber } from "ethers";

export const metadata = async (event) => {
  const id = BigNumber.from(`0x${event.pathParameters.id}`);

  const s3Json = await getS3Json("candy-shop/metadata", id.toString());

  if (!s3Json) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: `Candy with id ${id.toString()} could not be found`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: s3Json,
    headers: {
      "Content-Type": "application/json",
    },
  };
};
