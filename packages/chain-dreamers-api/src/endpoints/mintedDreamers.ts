import { getCurrentMintedDreamersList } from "../utils/updateMintedDreamersList";

export const mintedDreamers = async () => {
  const dreamersIds = await getCurrentMintedDreamersList();

  return {
    statusCode: 200,
    body: JSON.stringify({
      mintedDreamersIds: dreamersIds,
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
