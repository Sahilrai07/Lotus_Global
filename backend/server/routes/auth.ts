import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { ENV } from "../config/env";
import { authenticateToken, AuthRequest } from "../middleware/auth";

export const authRouter = Router();

/**
 * POST /api/auth/login
 * Public authentication route that validates admin credentials and issues a signed JWT.
 */
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Validate that email and password are provided
    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Find the user in Neon PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // 3. Constant-time / generic failure if user not found (prevent user enumeration)
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // 4. Verify password against stored bcrypt hash
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // 5. Generate secure JWT token (1 hour expiration)
    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      ENV.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 6. Return response with token and sanitized user details (NO passwordHash)
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
    console.error("[Lotus Backend Auth Error] Login error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error during authentication.",
    });
  }
});

/**
 * GET /api/auth/me
 * Protected verification route that returns the currently authenticated user's profile.
 */
authRouter.get("/me", authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User account not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err: unknown) {
    console.error("[Lotus Backend Auth Error] /me error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error retrieving user profile.",
    });
  }
});
