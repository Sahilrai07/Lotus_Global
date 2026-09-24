// Prisma Configuration for Lotus Global School
// Configures Prisma CLI (Migrations, Studio, Database Connection)
import "dotenv/config";
import { defineConfig } from "prisma/config";

const dbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_vzF4LudHWE3Q@ep-noisy-tree-b5xrljes-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

export default defineConfig({
  schema: "backend/prisma/schema.prisma",
  datasource: {
    url: dbUrl,
  },
});
