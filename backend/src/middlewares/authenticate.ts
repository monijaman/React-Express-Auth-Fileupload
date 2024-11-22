import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (!token) {
    res.status(401).json({ message: "Authentication token is required." });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error("JWT secret key is not defined in environment variables.");
    }

    // Decode the token
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Extract user ID from the token
    const userId = decoded.id;
    if (!userId) {
      res.status(401).json({ message: "Invalid token payload." });
      return;
    }

    // Fetch the user by their primary key (id)
    const user = await User.findByPk(userId, {
      attributes: ["id", "email", "fullName"], // Only fetch necessary fields
    });

 
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Attach user data to the request object
    (req as any).user = user;

    // Call the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
};

export default authenticate;
