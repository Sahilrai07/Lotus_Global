import { prisma } from "../server/config/prisma";
import fs from "fs";
import path from "path";

async function pullContent() {
  console.log("Fetching latest live website content from Neon PostgreSQL...");

  const siteContent = await prisma.siteContent.findUnique({
    where: { id: "active" },
  });

  if (!siteContent || !siteContent.data) {
    console.error("❌ No active site content found in Neon database.");
    process.exit(1);
  }

  const targetPath = path.resolve(process.cwd(), "src/data/siteData.json");
  fs.writeFileSync(targetPath, JSON.stringify(siteContent.data, null, 2), "utf-8");

  console.log(`✅ Success! Downloaded latest live content to ${targetPath}`);
  console.log("Your local code is now 100% in sync with Ma'am's live CMS edits.");
  process.exit(0);
}

pullContent().catch((err) => {
  console.error("❌ Error fetching live content:", err);
  process.exit(1);
});
