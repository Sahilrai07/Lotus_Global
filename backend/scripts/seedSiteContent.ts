import { prisma } from "../server/config/prisma";
import fs from "fs";
import path from "path";

async function seed() {
  console.log("Seeding site_content table in Neon PostgreSQL...");
  const dataPath = path.resolve(process.cwd(), "src/data/siteData.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const jsonData = JSON.parse(rawData);

  const existing = await prisma.siteContent.findUnique({
    where: { id: "active" },
  });

  if (existing) {
    console.log("Active site_content already exists in database. Updating with current siteData.json...");
    await prisma.siteContent.update({
      where: { id: "active" },
      data: { data: jsonData },
    });
  } else {
    console.log("Creating new active site_content record...");
    await prisma.siteContent.create({
      data: {
        id: "active",
        data: jsonData,
      },
    });
  }

  console.log("✅ site_content successfully seeded into Neon PostgreSQL!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
