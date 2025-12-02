// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader?.slice(0, 50)); // log partial header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - no token" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as any;
    console.log("Decoded token payload:", decoded);

    (req as any).userId = decoded.userId; // ensure token uses { userId: ... }
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
