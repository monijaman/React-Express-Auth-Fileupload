// src/types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; [key: string]: any }; // Customize as per your JWT payload
    }
  }
}
