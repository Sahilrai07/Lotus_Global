import pg from "pg";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // GET: Fetch live site content
  if (req.method === "GET") {
    try {
      const db = getPool();
      const result = await db.query("SELECT data FROM site_content WHERE id = 'active' LIMIT 1");
      if (result.rows.length > 0 && result.rows[0].data) {
        res.status(200).json(result.rows[0].data);
        return;
      }
    } catch (err) {
      console.warn("[SiteData DB fetch error]:", err.message);
    }

    // Fallback to local JSON if available
    try {
      const jsonPath = path.resolve(process.cwd(), "src/data/siteData.json");
      if (fs.existsSync(jsonPath)) {
        res.status(200).json(JSON.parse(fs.readFileSync(jsonPath, "utf-8")));
        return;
      }
    } catch {}

    res.status(404).json({ error: "Site data not found" });
    return;
  }

  // POST: Update live site content (Requires Admin JWT)
  if (req.method === "POST") {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Authentication required." });
        return;
      }

      const token = authHeader.split(" ")[1]?.trim();
      const secret = process.env.JWT_SECRET || "lotus_session_secret_key_2026";
      jwt.verify(token, secret);

      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || typeof body !== "object") {
        res.status(400).json({ success: false, message: "Invalid payload." });
        return;
      }

      const db = getPool();
      await db.query(
        'INSERT INTO site_content (id, data, "updatedAt") VALUES (\'active\', $1, NOW()) ON CONFLICT (id) DO UPDATE SET data = $1, "updatedAt" = NOW()',
        [JSON.stringify(body)]
      );

      res.status(200).json({ success: true, message: "Content updated live in cloud database!" });
    } catch (err) {
      console.error("[SiteData Save Error]:", err);
      res.status(500).json({ success: false, message: err.message || "Failed to save content." });
    }
    return;
  }

  res.status(405).json({ success: false, message: "Method not allowed" });
}
