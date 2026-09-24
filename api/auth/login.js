import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    const connStr =
      process.env.DATABASE_URL ||
      "postgresql://neondb_owner:npg_vzF4LudHWE3Q@ep-noisy-tree-b5xrljes-pooler.c-7.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { email, password } = body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required." });
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const db = getPool();
    const result = await db.query(
      'SELECT id, email, name, "passwordHash", role FROM users WHERE email = $1 LIMIT 1',
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const secret = process.env.JWT_SECRET || "lotus_session_secret_key_2026";
    const token = jwt.sign(
      { sub: user.id, role: user.role },
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
  } catch (err) {
    console.error("[Login API Error]:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Database connection error.",
    });
  }
}
