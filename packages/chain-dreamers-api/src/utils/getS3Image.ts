import AWS from "aws-sdk";

const S3 = new AWS.S3();

export const getS3Image = async (
  folder: string,
  id: string
): Promise<string | null> => {
  try {
    const data = await S3.getObject({
      Bucket: process.env.API_ASSETS_BUCKET_NAME as string,
      Key: `${folder}/${id}.png`,
    }).promise();

    return data.Body?.toString("base64") || null;
  } catch (error) {
    return null;
  }
};
