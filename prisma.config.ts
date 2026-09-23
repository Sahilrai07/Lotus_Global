// Prisma Configuration for Lotus Global School
// Configures Prisma CLI (Migrations, Studio, Database Connection)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "backend/prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
