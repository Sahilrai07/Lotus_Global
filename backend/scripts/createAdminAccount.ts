import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import { prisma } from "../server/config/prisma";

async function main() {
  const args = process.argv.slice(2);
  let email = args[0];
  let password = args[1];
  let name = args[2] || "School Administrator";
  let role = (args[3]?.toUpperCase() === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN") as "SUPER_ADMIN" | "ADMIN";

  if (!email || !password) {
    const rl = readline.createInterface({ input, output });
    console.log("\n--- Create Lotus Global School Admin Account ---\n");
    if (!email) {
      email = (await rl.question("Admin Email: ")).trim().toLowerCase();
    }
    if (!password) {
      password = await rl.question("Admin Password: ");
    }
    const nameInput = await rl.question("Admin Name (press Enter for 'School Administrator'): ");
    if (nameInput.trim()) name = nameInput.trim();
    rl.close();
  }

  if (!email || !password) {
    console.error("❌ Email and password are required.");
    process.exit(1);
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  if (existing) {
    console.log(`User ${email} already exists. Updating password and details...`);
    const updated = await prisma.user.update({
      where: { email },
      data: {
        name,
        passwordHash,
        role,
      },
    });
    console.log(`✅ Admin account updated for ${updated.email}!`);
  } else {
    const created = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role,
      },
    });
    console.log(`✅ Admin account created successfully for ${created.email}!`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error creating admin account:", err);
  process.exit(1);
});
