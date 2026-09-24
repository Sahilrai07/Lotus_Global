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
      "postgresql://neondb_owner:npg_vzF4LudHWE3Q@ep-noisy-tree-b5xrljes-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      max: 2,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

function sendJson(res, statusCode, data) {
  try {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.statusCode = statusCode;
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error("[sendJson error]:", err);
    try {
      res.statusCode = statusCode;
      res.end(JSON.stringify(data));
    } catch {}
  }
}

async function parseBody(req) {
  if (req.body) {
    if (typeof req.body === "string") {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  if (typeof req.on === "function") {
    return new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        try {
          resolve(data ? JSON.parse(data) : {});
        } catch {
          resolve({});
        }
      });
      req.on("error", () => resolve({}));
    });
  }

  return {};
}

function getHeader(req, name) {
  const lower = name.toLowerCase();
  if (!req?.headers) return null;
  return req.headers[lower] || req.headers[name] || null;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  // GET: Fetch live site content
  if (req.method === "GET") {
    try {
      const db = getPool();
      const result = await db.query("SELECT data FROM site_content WHERE id = 'active' LIMIT 1");
      if (result.rows.length > 0 && result.rows[0].data) {
        sendJson(res, 200, result.rows[0].data);
        return;
      }
    } catch (err) {
      console.warn("[SiteData DB fetch error]:", err.message);
    }

    // Fallback to local JSON if available in filesystem
    try {
      const jsonPath = path.resolve(process.cwd(), "src/data/siteData.json");
      if (fs.existsSync(jsonPath)) {
        sendJson(res, 200, JSON.parse(fs.readFileSync(jsonPath, "utf-8")));
        return;
      }
    } catch {}

    sendJson(res, 404, { error: "Site data not found" });
    return;
  }

  // POST: Update live site content (Requires Admin JWT)
  if (req.method === "POST") {
    try {
      const authHeader = getHeader(req, "authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        sendJson(res, 401, { success: false, message: "Authentication required." });
        return;
      }

      const token = authHeader.split(" ")[1]?.trim();
      const secret = process.env.JWT_SECRET || "lotus_session_secret_key_2026";
      jwt.verify(token, secret);

      const body = await parseBody(req);
      if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
        sendJson(res, 400, { success: false, message: "Invalid payload." });
        return;
      }

      const db = getPool();
      await db.query(
        'INSERT INTO site_content (id, data, "updatedAt") VALUES (\'active\', $1, NOW()) ON CONFLICT (id) DO UPDATE SET data = $1, "updatedAt" = NOW()',
        [JSON.stringify(body)]
      );

      sendJson(res, 200, { success: true, message: "Content updated live in cloud database!" });
    } catch (err) {
      console.error("[SiteData Save Error]:", err);
      sendJson(res, 500, { success: false, message: err.message || "Failed to save content." });
    }
    return;
  }

  sendJson(res, 405, { success: false, message: "Method not allowed" });
}
