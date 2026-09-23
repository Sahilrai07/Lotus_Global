import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET?.trim();

if (!JWT_SECRET) {
  console.error("[Fatal Security Error] JWT_SECRET is missing from environment variables (.env).");
  console.error("The server requires JWT_SECRET to securely sign and verify authentication tokens.");
  process.exit(1);
}

export const ENV = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  JWT_SECRET,
} as const;
