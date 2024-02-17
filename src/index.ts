import {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand  
} from "@aws-sdk/client-s3";
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
  const command: GetObjectCommand = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const url: string = await getSignedUrl(s3Client, command);
  return url;
}

// to put object in aws
async function putObject(
  bucket: string,
  fileName: string,
  contentType: string
): Promise<string> {
  const command: PutObjectCommand = new PutObjectCommand({
    Bucket: bucket,
    Key: `/uploads/user-files/${fileName}`,
    ContentType: contentType,
  });

  const url: string = await getSignedUrl(s3Client, command, {expiresIn: 2000});

  return url;
}  

// to list objects
async function listObjects(): Promise<void> {
  const command: ListObjectsV2Command = new ListObjectsV2Command({
    Bucket: "wantedbear007-private",
    
  })

  const res: any = await s3Client.send(command)

  console.log(res)
}

// to delete objects
async function deleteObject(): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: "wantedbear007-private",
    Key: "/uploads/user-files/profilePic.jpeg"

  })

  await s3Client.send(command);
  
}

async function init(): Promise<void> {
    // await deleteObject();
  // await listObjects();
  // console.log(
  //   "URL is: ",
  //   await getImageUrl("bhanuImage.jpg", "wantedbear007-private")
  // );
  // console.log("url to add file: ", await putObject("wantedbear007-private", "profilePic.jpeg", "image/jpeg"))
}

init();
