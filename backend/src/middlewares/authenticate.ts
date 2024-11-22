import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from header

  if (!token) {
    // Send response directly, but don't return it
    res.status(401).json({ message: "Authentication token is required." });
    return; // Prevent further code execution
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    // Send response directly, but don't return it
    res.status(401).json({ message: "Invalid token." });
    return; // Prevent further code execution
  }
};

export default authenticate;
