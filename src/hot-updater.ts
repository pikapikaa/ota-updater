import { existsSync } from "node:fs";
import { createHotUpdater } from "@hot-updater/server";
import { kyselyAdapter } from "@hot-updater/server/adapters/kysely";
import { apiKeys, insights } from "@hot-updater/server/plugins";
import { s3Storage } from "@hot-updater/aws";
import { db } from "./kysely";
import "dotenv/config";

if (existsSync(".env.hotupdater")) {
  process.loadEnvFile(".env.hotupdater");
}

export const hotUpdater = createHotUpdater({
  database: kyselyAdapter({ db, provider: "sqlite" }),
  plugins: [insights(), apiKeys()],
  storage: s3Storage({
    region: "auto",
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    bucketName: process.env.S3_BUCKET_NAME!,
  }),
});
