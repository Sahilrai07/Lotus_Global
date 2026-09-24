import jwt from "jsonwebtoken";
import { prisma } from "../backend/server/config/prisma";
import { ENV } from "../backend/server/config/env";
import defaultSiteData from "../src/data/siteData.json";

export default async function handler(req: any, res: any) {
  // CORS configuration
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

  // GET: Fetch live site content from Neon DB
  if (req.method === "GET") {
    try {
      const siteContent = await prisma.siteContent.findUnique({
        where: { id: "active" },
      });

      if (siteContent && siteContent.data) {
        res.status(200).json(siteContent.data);
        return;
      }

      res.status(200).json(defaultSiteData);
    } catch (err: unknown) {
      console.warn("[SiteData Warning] DB fetch fallback to default JSON:", err);
      res.status(200).json(defaultSiteData);
    }
    return;
  }

  // POST: Update live site content in Neon DB (Requires Admin JWT)
  if (req.method === "POST") {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
          success: false,
          message: "Authentication required to update site content.",
        });
        return;
      }

      const token = authHeader.split(" ")[1]?.trim();
      const secret = process.env.JWT_SECRET || ENV.JWT_SECRET || "lotus_session_secret_key_2026";

      try {
        jwt.verify(token, secret);
      } catch {
        res.status(401).json({
          success: false,
          message: "Session expired or invalid token. Please log in again.",
        });
        return;
      }

      const updatedData = req.body;
      if (!updatedData || typeof updatedData !== "object") {
        res.status(400).json({ success: false, message: "Invalid payload provided." });
        return;
      }

      await prisma.siteContent.upsert({
        where: { id: "active" },
        update: { data: updatedData },
        create: { id: "active", data: updatedData },
      });

      res.status(200).json({
        success: true,
        message: "Content updated live in cloud database!",
      });
    } catch (err: unknown) {
      console.error("[SiteData Save Error]:", err);
      res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : "Failed to update site content in database.",
      });
    }
    return;
  }

  res.status(405).json({ success: false, message: "Method not allowed." });
}
