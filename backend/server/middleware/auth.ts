import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";

export interface AuthUser {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

interface TokenPayload extends JwtPayload {
  sub: string;
  role: string;
}

/**
 * Authentication middleware that verifies JWT tokens from the Authorization header.
 * Expected format: Bearer <token>
 */
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Access denied. Authentication token required.",
    });
    return;
  }

  const token = authHeader.split(" ")[1]?.trim();

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Malformed authorization header. Expected Bearer <token>.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as TokenPayload;

    if (!decoded || !decoded.sub) {
      res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
      return;
    }

    // Attach user identity to request object
    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch (err: unknown) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Authentication token has expired. Please log in again.",
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
    return;
  }
};
