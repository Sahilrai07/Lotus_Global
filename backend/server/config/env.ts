import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const DEFAULT_DB_URL =
  "postgresql://neondb_owner:npg_RngtLI5UedB1@ep-noisy-tree-b5xrljes-pooler.c-7.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

const JWT_SECRET =
  process.env.JWT_SECRET?.trim() ||
  "be61fc17cfbdb10e676fc74f57c24c35414dd45fad86a1d786a4882288fe7843";

export const ENV = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || DEFAULT_DB_URL,
  JWT_SECRET,
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_SECURE: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  SCHOOL_OFFICIAL_EMAIL: process.env.SCHOOL_OFFICIAL_EMAIL || "lotusglobalschool@gmail.com",
} as const;

