import AWS from "aws-sdk";

const S3 = new AWS.S3();

export const storeS3Image = async (
  folder: string,
  id: string,
  image: Buffer
): Promise<void> => {
  const objectData = {
    Bucket: process.env.API_ASSETS_BUCKET_NAME as string,
    Key: `${folder}/${id}.png`,
    Body: image,
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  await S3.putObject(objectData).promise();
};
