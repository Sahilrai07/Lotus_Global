import { Router, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { authenticateToken } from "../middleware/auth";
import { authorizeRoles } from "../middleware/authorize";

export const noticesRouter = Router();

/**
 * GET /api/notices
 * Public endpoint: Returns all active school notices ordered by newest published date.
 */
noticesRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const notices = await prisma.notice.findMany({
      where: { isActive: true },
      orderBy: [
        { publishedAt: "desc" },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        isActive: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: notices,
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Notice Error] Failed to fetch public notices:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve notices.",
    });
  }
});

/**
 * GET /api/notices/:id
 * Public endpoint: Returns a single active notice by its ID. Returns 404 if not found or inactive.
 */
noticesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notice = await prisma.notice.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        isActive: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!notice || !notice.isActive) {
      res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Notice Error] Failed to fetch notice by ID:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve notice.",
    });
  }
});

/**
 * POST /api/notices
 * Protected management endpoint: Creates a new school notice.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
noticesRouter.post(
  "/",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { title, content, category, isActive, publishedAt } = req.body;

      // 1. Validate title
      if (!title || typeof title !== "string" || title.trim() === "") {
        res.status(400).json({
          success: false,
          message: "Title is required and cannot be empty.",
        });
        return;
      }

      const trimmedTitle = title.trim();
      if (trimmedTitle.length > 200) {
        res.status(400).json({
          success: false,
          message: "Title must not exceed 200 characters.",
        });
        return;
      }

      // 2. Validate content
      if (!content || typeof content !== "string" || content.trim() === "") {
        res.status(400).json({
          success: false,
          message: "Content is required and cannot be empty.",
        });
        return;
      }

      const trimmedContent = content.trim();

      // 3. Validate category (optional, max 100 chars)
      let parsedCategory = "General";
      if (category !== undefined) {
        if (typeof category !== "string") {
          res.status(400).json({
            success: false,
            message: "Category must be a string.",
          });
          return;
        }
        parsedCategory = category.trim() || "General";
        if (parsedCategory.length > 100) {
          res.status(400).json({
            success: false,
            message: "Category must not exceed 100 characters.",
          });
          return;
        }
      }

      // 4. Validate isActive (optional boolean)
      let parsedIsActive = true;
      if (isActive !== undefined) {
        if (typeof isActive !== "boolean") {
          res.status(400).json({
            success: false,
            message: "Field 'isActive' must be a boolean.",
          });
          return;
        }
        parsedIsActive = isActive;
      }

      // 5. Validate publishedAt (optional Date)
      let parsedPublishedAt = new Date();
      if (publishedAt !== undefined) {
        const date = new Date(publishedAt);
        if (isNaN(date.getTime())) {
          res.status(400).json({
            success: false,
            message: "Field 'publishedAt' must be a valid date format.",
          });
          return;
        }
        parsedPublishedAt = date;
      }

      // 6. Insert new notice into Neon PostgreSQL
      const newNotice = await prisma.notice.create({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          category: parsedCategory,
          isActive: parsedIsActive,
          publishedAt: parsedPublishedAt,
        },
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          isActive: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(201).json({
        success: true,
        data: newNotice,
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Notice Error] Failed to create notice:", err);
      res.status(500).json({
        success: false,
        message: "Failed to create notice.",
      });
    }
  }
);

/**
 * PUT /api/notices/:id
 * Protected management endpoint: Updates an existing school notice.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
noticesRouter.put(
  "/:id",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 1. Check existence
      const existing = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Notice not found.",
        });
        return;
      }

      const { title, content, category, isActive, publishedAt } = req.body;
      const updateData: {
        title?: string;
        content?: string;
        category?: string;
        isActive?: boolean;
        publishedAt?: Date;
      } = {};

      // 2. Validate update fields
      if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
          res.status(400).json({
            success: false,
            message: "Title cannot be empty.",
          });
          return;
        }
        const trimmed = title.trim();
        if (trimmed.length > 200) {
          res.status(400).json({
            success: false,
            message: "Title must not exceed 200 characters.",
          });
          return;
        }
        updateData.title = trimmed;
      }

      if (content !== undefined) {
        if (typeof content !== "string" || content.trim() === "") {
          res.status(400).json({
            success: false,
            message: "Content cannot be empty.",
          });
          return;
        }
        updateData.content = content.trim();
      }

      if (category !== undefined) {
        if (typeof category !== "string") {
          res.status(400).json({
            success: false,
            message: "Category must be a string.",
          });
          return;
        }
        const trimmed = category.trim() || "General";
        if (trimmed.length > 100) {
          res.status(400).json({
            success: false,
            message: "Category must not exceed 100 characters.",
          });
          return;
        }
        updateData.category = trimmed;
      }

      if (isActive !== undefined) {
        if (typeof isActive !== "boolean") {
          res.status(400).json({
            success: false,
            message: "Field 'isActive' must be a boolean.",
          });
          return;
        }
        updateData.isActive = isActive;
      }

      if (publishedAt !== undefined) {
        const date = new Date(publishedAt);
        if (isNaN(date.getTime())) {
          res.status(400).json({
            success: false,
            message: "Field 'publishedAt' must be a valid date format.",
          });
          return;
        }
        updateData.publishedAt = date;
      }

      // 3. Persist update in Neon PostgreSQL
      const updatedNotice = await prisma.notice.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          isActive: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(200).json({
        success: true,
        data: updatedNotice,
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Notice Error] Failed to update notice:", err);
      res.status(500).json({
        success: false,
        message: "Failed to update notice.",
      });
    }
  }
);

/**
 * PATCH /api/notices/:id/status
 * Protected management endpoint: Toggles publish status (active/inactive).
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
noticesRouter.patch(
  "/:id/status",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      if (typeof isActive !== "boolean") {
        res.status(400).json({
          success: false,
          message: "Field 'isActive' must be a boolean.",
        });
        return;
      }

      const existing = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Notice not found.",
        });
        return;
      }

      const updatedNotice = await prisma.notice.update({
        where: { id },
        data: { isActive },
        select: {
          id: true,
          title: true,
          content: true,
          category: true,
          isActive: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.status(200).json({
        success: true,
        data: updatedNotice,
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Notice Error] Failed to update notice status:", err);
      res.status(500).json({
        success: false,
        message: "Failed to update notice status.",
      });
    }
  }
);

/**
 * DELETE /api/notices/:id
 * Protected management endpoint: Permanently deletes a notice.
 * Allowed roles: SUPER_ADMIN, ADMIN
 */
noticesRouter.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("SUPER_ADMIN", "ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const existing = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existing) {
        res.status(404).json({
          success: false,
          message: "Notice not found.",
        });
        return;
      }

      await prisma.notice.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Notice deleted successfully",
      });
    } catch (err: unknown) {
      console.error("[Lotus Backend Notice Error] Failed to delete notice:", err);
      res.status(500).json({
        success: false,
        message: "Failed to delete notice.",
      });
    }
  }
);
