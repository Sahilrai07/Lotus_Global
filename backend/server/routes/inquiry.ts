import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { sendInquiryEmail } from "../services/emailService";

export const inquiryRouter = Router();

/**
 * POST /api/inquiries
 * Public endpoint to submit a new inquiry from the website.
 */
inquiryRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { parentName, studentName, gradeSeeking, phone, email, notes, source } = req.body;

    // Validate required fields
    if (!parentName || typeof parentName !== "string" || !parentName.trim()) {
      return res.status(400).json({ success: false, message: "Parent/Guardian name is required" });
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return res.status(400).json({ success: false, message: "Contact telephone number is required" });
    }

    if (!gradeSeeking || typeof gradeSeeking !== "string" || !gradeSeeking.trim()) {
      return res.status(400).json({ success: false, message: "Grade seeking admission is required" });
    }

    // 1. Save inquiry in Database (Neon PostgreSQL)
    const inquiry = await prisma.inquiry.create({
      data: {
        parentName: parentName.trim(),
        studentName: studentName ? studentName.trim() : null,
        gradeSeeking: gradeSeeking.trim(),
        phone: phone.trim(),
        email: email && typeof email === "string" ? email.trim() : null,
        notes: notes && typeof notes === "string" ? notes.trim() : null,
        source: source && typeof source === "string" ? source.trim() : "Website Modal",
        status: "NEW",
      },
    });

    // 2. Dispatch email to school official email
    const emailResult = await sendInquiryEmail({
      inquiryId: inquiry.id,
      parentName: inquiry.parentName,
      studentName: inquiry.studentName || undefined,
      gradeSeeking: inquiry.gradeSeeking,
      phone: inquiry.phone,
      email: inquiry.email || undefined,
      notes: inquiry.notes || undefined,
      source: inquiry.source,
      createdAt: inquiry.createdAt,
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry registered successfully",
      inquiry,
      emailSent: emailResult.success,
      emailSimulated: emailResult.simulated,
    });
  } catch (error: any) {
    console.error("[Inquiry Submission Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process inquiry submission",
      error: error?.message,
    });
  }
});

/**
 * GET /api/inquiries
 * List all inquiries (for Admin Dashboard).
 */
inquiryRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { status, grade } = req.query;

    const where: any = {};
    if (status && typeof status === "string" && status !== "ALL") {
      where.status = status;
    }
    if (grade && typeof grade === "string" && grade !== "ALL") {
      where.gradeSeeking = grade;
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error: any) {
    console.error("[Get Inquiries Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve inquiries",
      error: error?.message,
    });
  }
});

/**
 * PATCH /api/inquiries/:id
 * Update inquiry status (NEW, CONTACTED, FOLLOW_UP, RESOLVED).
 */
inquiryRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || typeof status !== "string") {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      success: true,
      inquiry: updated,
    });
  } catch (error: any) {
    console.error("[Update Inquiry Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update inquiry status",
      error: error?.message,
    });
  }
});

/**
 * DELETE /api/inquiries/:id
 * Delete an inquiry by ID.
 */
inquiryRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.inquiry.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error: any) {
    console.error("[Delete Inquiry Error]:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete inquiry",
      error: error?.message,
    });
  }
});
