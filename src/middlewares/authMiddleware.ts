import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";

// Augment the Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access denied");

    jwt.verify(token, JWT_KEY, (err: any, user: any) => {
      if (err) return res.status(403).send("Invalid token");
      req.user = user;
      next();
    });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};
