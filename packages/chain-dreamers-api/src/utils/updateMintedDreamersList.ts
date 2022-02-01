import AWS from "aws-sdk";

const documentKey = "MINTED_DREAMERS_LIST";
const TABLE_NAME = process.env.API_CHAIN_DREAMERS_TABLE_NAME || "";
const DynamoDBClient = new AWS.DynamoDB.DocumentClient();

export const updateMintedDreamersList = async (id: number): Promise<void> => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        key: documentKey,
      },
      UpdateExpression: "set #ids_value = list_append (#ids_value, :idList)",
      ConditionExpression: "not contains (#ids_value, :id)",
      ExpressionAttributeValues: {
        ":id": id,
        ":idList": [id],
      },
      ExpressionAttributeNames: {
        "#ids_value": "value",
      },
      ReturnValues: "UPDATED_NEW",
    };

    await DynamoDBClient.update(params).promise();
  } catch {}
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
