import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const accessKey: string = process.env.ACCESSKEY!;
const secretKey: string = process.env.SECRETACCESSKEY!;

console.log("access key: ", accessKey, " secret key: ", secretKey);

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

// to get object
async function getImageUrl(key: string, bucket: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const url: string = await getSignedUrl(s3Client, command);
  return url;
}

async function init(): Promise<void> {
  console.log(
    "URL is: ",
    await getImageUrl("bhanuImage.jpg", "wantedbear007-private")
  );
}

// init();
