import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";


// Function to validate token

export const validateToken = async (req: Request, res: Response): Promise<void> => {

  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      // If no token is provided, return 401 Unauthorized
      res.status(401).json({ error: "No token provided" });
      return;  // Ensure function terminates here
    }
    
    // Verify the token asynchronously
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;
  
     // Fetch user data from the database based on the decoded token
    const user = await User.findOne({ where: { id: decoded.id } }); // Adjust based on your ORM

    if (!user) {
      // If user not found, return 404 Not Found
      res.status(404).json({ error: "User not found" });
      return;  // Ensure function terminates here
    }

    // Optionally, attach the user to the request object for use in subsequent routes
    // req.user = user;

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Token is valid', user });

  } catch (error) {
    // Catch any errors that occur during the process
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    res.status(400).json({ error: "Login failed", details: errorMessage });
  }
};



export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";

    res
      .status(400)
      .json({ error: "Registration failed", details: errorMessage });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    res.status(400).json({ error: "Login failed", details: errorMessage });
  }
};
