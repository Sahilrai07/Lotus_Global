import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../backend/server/config/prisma";
import { ENV } from "../../backend/server/config/env";

export default async function handler(req: any, res: any) {
  // 1. Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed. Use POST." });
    return;
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user in Neon DB via Prisma
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    const secret = process.env.JWT_SECRET || ENV.JWT_SECRET || "lotus_session_secret_key_2026";
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (err: unknown) {
    console.error("[Login Handler Error]:", err);
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Internal server authentication error.",
    });
  }
}
