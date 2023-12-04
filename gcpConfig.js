import { Storage } from "@google-cloud/storage";

export const storageClient = new Storage(getGCPCredentials());

const bucketName = "vistoappbd";
const fileName = "my-file.json";
const file = storageClient.bucket(bucketName).file(fileName);

await file.save(
  JSON.stringify({
    foo: "bar",
  }),
  {
    contentType: "application/json",
  }
);
