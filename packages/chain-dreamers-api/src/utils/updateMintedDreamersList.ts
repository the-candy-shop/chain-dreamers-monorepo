import AWS from "aws-sdk";

const documentKey = "MINTED_DREAMERS_LIST";
const TABLE_NAME = process.env.API_CHAIN_DREAMERS_TABLE_NAME || "";
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();

export const updateMintedDreamersList = async (id: number): Promise<void> => {
  const mintedDreamers = await getCurrentMintedDreamersList();
  mintedDreamers.push(id);
  await setCurrentMintedDreamersList(mintedDreamers);
};

export async function getCurrentMintedDreamersList(): Promise<number[]> {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      key: documentKey,
    },
  };

  const { Item } = await DynamoDBClient.get(params).promise();

  if (Item && Item.value && Array.isArray(Item.value)) {
    return Item.value;
  }

  return [];
}

async function setCurrentMintedDreamersList(value: number[]): Promise<void> {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      key: documentKey,
      value: value,
    },
  };

  await DynamoDBClient.put(params).promise();
}
