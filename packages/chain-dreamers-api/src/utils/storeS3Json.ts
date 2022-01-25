import AWS from "aws-sdk";

const S3 = new AWS.S3();

export const storeS3Json = async (
  folder: string,
  id: string,
  json: object
): Promise<void> => {
  const objectData = {
    Bucket: process.env.API_ASSETS_BUCKET_NAME as string,
    Key: `${folder}/${id}.json`,
    Body: JSON.stringify(json),
    ContentEncoding: "utf8",
    ContentType: "application/json",
  };

  await S3.putObject(objectData).promise();
};
