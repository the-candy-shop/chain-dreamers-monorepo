import { getS3Json } from "../../utils/getS3Json";
import { storeS3Json } from "../../utils/storeS3Json";

export const metadata = async (event) => {
  const id = event.pathParameters.id;
  const noCache =
    event.queryStringParameters && event.queryStringParameters["no-cache"];

  const s3Json = await getS3Json("og/metadata", id);

  if (s3Json && !noCache) {
    return {
      statusCode: 200,
      body: s3Json,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }

  const metadata = {
    name: "Chain Dreamers OG Badge",
    description:
      "A sign you were one of the very firsts to support the Chain Dreamers",
    image:
      process.env.API_DOMAIN_BASE_PATH === ""
        ? `https://${process.env.API_DOMAIN_NAME}/og/tokens/${id}/img`
        : `https://${process.env.API_DOMAIN_NAME}/${process.env.API_DOMAIN_BASE_PATH}/og/tokens/${id}/img`,
  };

  storeS3Json("og/metadata", id, metadata);

  return {
    statusCode: 200,
    body: JSON.stringify(metadata),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
