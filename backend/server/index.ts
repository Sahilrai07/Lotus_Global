import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { prisma } from "./config/prisma";
import { authRouter } from "./routes/auth";
import { noticesRouter } from "./routes/notices";
import { galleryRouter } from "./routes/gallery";
import { documentsRouter } from "./routes/documents";

const app = express();

// 1. Enable CORS for local frontend communication
app.use(
  cors({
    origin: [ENV.CLIENT_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

// 2. Parse incoming JSON request bodies
app.use(express.json());

// 3. Health-check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Lotus Global School API is running",
  });
});

// 4. API routes
app.use("/api/auth", authRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/documents", documentsRouter);

// 5. Fallback 404 handler for undefined routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 6. Basic global error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Lotus Backend Server Error]:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// 7. Start the Express server
app.listen(ENV.PORT, () => {
  console.log(`[Lotus Backend] Server is running on http://localhost:${ENV.PORT}`);
  console.log(`[Lotus Backend] Health-check available at http://localhost:${ENV.PORT}/api/health`);
  console.log(`[Lotus Backend] Notices endpoint available at http://localhost:${ENV.PORT}/api/notices`);
  console.log(`[Lotus Backend] Gallery endpoint available at http://localhost:${ENV.PORT}/api/gallery`);
  console.log(`[Lotus Backend] Documents endpoint available at http://localhost:${ENV.PORT}/api/documents`);
});
