import AWS from "aws-sdk";

const S3 = new AWS.S3();

export const getS3Json = async (
  folder: string,
  id: string
): Promise<string | null> => {
  try {
    const data = await S3.getObject({
      Bucket: process.env.API_ASSETS_BUCKET_NAME as string,
      Key: `${folder}/${id}.json`,
    }).promise();

    return data.Body?.toString() || null;
  } catch (error) {
    return null;
  }
};
