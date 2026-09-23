import { prisma } from "../server/config/prisma";

async function main() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    console.log(`Total users in database: ${users.length}`);
    users.forEach((u, i) => {
      console.log(`[${i + 1}] Email: ${u.email} | Role: ${u.role} | Created: ${u.createdAt.toISOString()}`);
    });
  } catch (err: unknown) {
    console.error("Error querying users:", err instanceof Error ? err.message : err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
