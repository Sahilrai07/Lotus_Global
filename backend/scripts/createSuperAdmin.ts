import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import { prisma } from "../server/config/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function main() {
  console.log("\n==================================================");
  console.log("   Lotus Global School — Create SUPER_ADMIN CLI   ");
  console.log("==================================================\n");

  const rl = readline.createInterface({ input, output });

  try {
    // 1. Prompt for Email
    const rawEmail = await rl.question("Enter Admin Email: ");
    const email = rawEmail.trim().toLowerCase();

    if (!email) {
      console.error("\n❌ Error: Email is required.");
      process.exitCode = 1;
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      console.error("\n❌ Error: Invalid email format. Please provide a valid email address.");
      process.exitCode = 1;
      return;
    }

    // 2. Check if Email Already Exists in Neon Database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(`\n❌ Error: An account with email "${email}" already exists (Role: ${existingUser.role}).`);
      console.error("Existing user accounts cannot be overwritten by this script.");
      process.exitCode = 1;
      return;
    }

    // 3. Prompt for Password
    const password = await rl.question("Enter Password (min 8 characters): ");

    if (!password || password.length < 8) {
      console.error("\n❌ Error: Password must be at least 8 characters long.");
      process.exitCode = 1;
      return;
    }

    // 4. Prompt for Password Confirmation
    const confirmPassword = await rl.question("Confirm Password: ");

    if (password !== confirmPassword) {
      console.error("\n❌ Error: Passwords do not match.");
      process.exitCode = 1;
      return;
    }

    // 5. Optional Name Prompt
    const rawName = await rl.question("Enter Admin Name (optional, press Enter for 'Super Administrator'): ");
    const name = rawName.trim() || "Super Administrator";

    console.log("\n⏳ Hashing password securely with bcrypt and registering SUPER_ADMIN in Neon...");

    // 6. Hash password with bcryptjs (salt rounds: 12)
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 7. Store user record in Neon PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "SUPER_ADMIN",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    console.log("\n✅ SUCCESS: SUPER_ADMIN created successfully!");
    console.log("--------------------------------------------------");
    console.log(`Email:      ${newUser.email}`);
    console.log(`Name:       ${newUser.name}`);
    console.log(`Role:       ${newUser.role}`);
    console.log(`Created At: ${newUser.createdAt.toISOString()}`);
    console.log("--------------------------------------------------\n");
  } catch (error: unknown) {
    console.error("\n❌ Error occurred during admin creation:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main();
