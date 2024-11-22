import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

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
