import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ENV } from "./env";

// In Prisma 7, the PostgreSQL adapter connects via DATABASE_URL
const adapter = new PrismaPg({ connectionString: ENV.DATABASE_URL });

// Singleton pattern: reuse the client in development to prevent connection leaks during hot-reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ENV.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (ENV.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
