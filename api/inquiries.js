import pg from "pg";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    });

    pool.on("error", (err) => {
      console.warn("[Neon Pool warning]:", err.message);
      pool = null;
    });
  }
  return pool;
}

async function queryDatabase(text, params) {
  let db = getPool();
  try {
    return await db.query(text, params);
  } catch (err) {
    const msg = String(err?.message || "").toLowerCase();
    if (msg.includes("closed") || msg.includes("terminated") || msg.includes("timeout") || msg.includes("connection")) {
      console.warn("[Neon Query Retry]: Reconnecting pool after error:", err.message);
      try {
        if (pool) await pool.end();
      } catch {}
      pool = null;
      db = getPool();
      return await db.query(text, params);
    }
    throw err;
  }
}

function sendJson(res, statusCode, data) {
  try {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Authorization");
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
    if (Buffer.isBuffer(req.body)) {
      try {
        return JSON.parse(req.body.toString("utf-8"));
      } catch {
        return {};
      }
    }
    if (typeof req.body === "object") {
      return req.body;
    }
  }

  if (typeof req.on === "function") {
    return new Promise((resolve) => {
      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        try {
          const raw = Buffer.concat(chunks).toString("utf-8");
          resolve(raw ? JSON.parse(raw) : {});
        } catch {
          resolve({});
        }
      });
      req.on("error", () => resolve({}));
    });
  }

  return {};
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Extract ID from query param (e.g. ?id=inq-123 or from rewritten URL)
  let id = "";
  if (req.query?.id) {
    id = String(req.query.id);
  } else if (req.url && req.url.includes("?")) {
    const parsed = new URL(req.url, "http://localhost");
    id = parsed.searchParams.get("id") || "";
  }

  // 1. GET /api/inquiries -> List inquiries for Admin Dashboard
  if (req.method === "GET") {
    try {
      const statusFilter = req.query?.status || "";
      const gradeFilter = req.query?.grade || "";

      let query = 'SELECT id, "parentName", "studentName", "gradeSeeking", phone, email, notes, source, status, "createdAt", "updatedAt" FROM inquiries';
      const params = [];

      if (statusFilter && statusFilter !== "ALL") {
        params.push(statusFilter);
        query += ` WHERE status = $${params.length}`;
      }
      if (gradeFilter && gradeFilter !== "ALL") {
        params.push(gradeFilter);
        query += params.length === 1 ? ` WHERE "gradeSeeking" = $${params.length}` : ` AND "gradeSeeking" = $${params.length}`;
      }

      query += ' ORDER BY "createdAt" DESC';

      const result = await queryDatabase(query, params);
      sendJson(res, 200, {
        success: true,
        count: result.rows.length,
        inquiries: result.rows,
      });
    } catch (err) {
      console.error("[Get Inquiries API Error]:", err);
      sendJson(res, 500, {
        success: false,
        message: "Failed to retrieve inquiries",
        error: err.message,
      });
    }
    return;
  }

  // 2. POST /api/inquiries -> Submit new inquiry from website forms
  if (req.method === "POST") {
    try {
      const body = await parseBody(req);
      const { parentName, studentName, gradeSeeking, phone, email, notes, source } = body;

      if (!parentName || typeof parentName !== "string" || !parentName.trim()) {
        sendJson(res, 400, { success: false, message: "Parent/Guardian name is required" });
        return;
      }
      if (!phone || typeof phone !== "string" || !phone.trim()) {
        sendJson(res, 400, { success: false, message: "Contact telephone number is required" });
        return;
      }
      if (!gradeSeeking || typeof gradeSeeking !== "string" || !gradeSeeking.trim()) {
        sendJson(res, 400, { success: false, message: "Grade seeking admission is required" });
        return;
      }

      const inquiryId = `inq-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
      const cleanParent = parentName.trim();
      const cleanStudent = studentName ? String(studentName).trim() : null;
      const cleanGrade = gradeSeeking.trim();
      const cleanPhone = phone.trim();
      const cleanEmail = email && typeof email === "string" ? email.trim() : null;
      const cleanNotes = notes && typeof notes === "string" ? notes.trim() : null;
      const cleanSource = source && typeof source === "string" ? source.trim() : "Website Inquiry";

      const insertQuery = `
        INSERT INTO inquiries (id, "parentName", "studentName", "gradeSeeking", phone, email, notes, source, status, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'NEW', NOW(), NOW())
        RETURNING *
      `;

      const result = await queryDatabase(insertQuery, [
        inquiryId,
        cleanParent,
        cleanStudent,
        cleanGrade,
        cleanPhone,
        cleanEmail,
        cleanNotes,
        cleanSource,
      ]);

      const savedInquiry = result.rows[0];

      // Dispatch notification email if SMTP credentials are configured
      let emailSent = false;
      let emailSimulated = true;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const officialEmail = process.env.SCHOOL_OFFICIAL_EMAIL || "lotusglobalschool@gmail.com";

      if (smtpUser && smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587", 10),
            secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
            auth: { user: smtpUser, pass: smtpPass },
          });

          await transporter.sendMail({
            from: `"Lotus Global School Admissions" <${smtpUser}>`,
            to: officialEmail,
            replyTo: savedInquiry.email || undefined,
            subject: `New Admission Inquiry: ${savedInquiry.studentName || savedInquiry.gradeSeeking} - ${savedInquiry.parentName}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #2F5187; padding: 20px; color: white; border-bottom: 4px solid #E87737; text-align: center;">
                  <h2 style="margin: 0;">Lotus Global School</h2>
                  <p style="margin: 4px 0 0; font-size: 13px; color: #FED7AA;">NEW ADMISSION INQUIRY RECEIVED</p>
                </div>
                <div style="padding: 24px; background: #ffffff;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 140px;">Parent/Guardian:</td><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">${savedInquiry.parentName}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Student Name:</td><td style="padding: 8px 0; color: #1e293b;">${savedInquiry.studentName || 'Not specified'}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Grade Seeking:</td><td style="padding: 8px 0; color: #2563eb; font-weight: bold;">${savedInquiry.gradeSeeking}</td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Contact Phone:</td><td style="padding: 8px 0;"><a href="tel:${savedInquiry.phone}" style="color: #2F5187; font-weight: bold;">${savedInquiry.phone}</a></td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email Address:</td><td style="padding: 8px 0;"><a href="mailto:${savedInquiry.email || ''}" style="color: #2F5187;">${savedInquiry.email || 'Not provided'}</a></td></tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; font-weight: bold;">Inquiry Source:</td><td style="padding: 8px 0; color: #475569;">${savedInquiry.source}</td></tr>
                  </table>
                  ${savedInquiry.notes ? `<div style="margin-top: 16px; padding: 12px; background: #F8FAFC; border-left: 4px solid #2F5187; font-size: 14px;"><strong>Parent Notes:</strong><br/>${savedInquiry.notes}</div>` : ''}
                  <div style="margin-top: 24px; text-align: center;">
                    <a href="tel:${savedInquiry.phone}" style="display: inline-block; padding: 10px 18px; margin: 4px; background: #2F5187; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">📞 Call Parent</a>
                    <a href="https://wa.me/91${savedInquiry.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; padding: 10px 18px; margin: 4px; background: #16a34a; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">💬 WhatsApp</a>
                  </div>
                </div>
                <div style="background: #f8fafc; padding: 12px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
                  Lotus Global School Admissions Desk &bull; Vatar, Vapi, Gujarat
                </div>
              </div>
            `,
          });
          emailSent = true;
          emailSimulated = false;
        } catch (mailErr) {
          console.warn("[Inquiries API Email Warning]:", mailErr.message);
        }
      }

      sendJson(res, 201, {
        success: true,
        message: "Inquiry registered successfully",
        inquiry: savedInquiry,
        emailSent,
        emailSimulated,
      });
    } catch (err) {
      console.error("[Submit Inquiry API Error]:", err);
      sendJson(res, 500, {
        success: false,
        message: "Failed to process inquiry submission",
        error: err.message,
      });
    }
    return;
  }

  // 3. PATCH /api/inquiries?id=... -> Update inquiry status in Admin Dashboard
  if (req.method === "PATCH") {
    try {
      if (!id) {
        sendJson(res, 400, { success: false, message: "Inquiry ID is required" });
        return;
      }
      const body = await parseBody(req);
      const { status } = body;
      if (!status || typeof status !== "string") {
        sendJson(res, 400, { success: false, message: "Status is required" });
        return;
      }

      const updateQuery = 'UPDATE inquiries SET status = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING *';
      const result = await queryDatabase(updateQuery, [status, id]);

      if (result.rows.length === 0) {
        sendJson(res, 404, { success: false, message: "Inquiry not found" });
        return;
      }

      sendJson(res, 200, {
        success: true,
        inquiry: result.rows[0],
      });
    } catch (err) {
      console.error("[Patch Inquiry API Error]:", err);
      sendJson(res, 500, {
        success: false,
        message: "Failed to update inquiry status",
        error: err.message,
      });
    }
    return;
  }

  // 4. DELETE /api/inquiries?id=... -> Delete an inquiry in Admin Dashboard
  if (req.method === "DELETE") {
    try {
      if (!id) {
        sendJson(res, 400, { success: false, message: "Inquiry ID is required" });
        return;
      }

      await queryDatabase("DELETE FROM inquiries WHERE id = $1", [id]);
      sendJson(res, 200, {
        success: true,
        message: "Inquiry deleted successfully",
      });
    } catch (err) {
      console.error("[Delete Inquiry API Error]:", err);
      sendJson(res, 500, {
        success: false,
        message: "Failed to delete inquiry",
        error: err.message,
      });
    }
    return;
  }

  sendJson(res, 405, { success: false, message: "Method not allowed" });
}
