import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import generateToken from "../utils/generateToken";

// @Desc Get all users
// @Route /api/auth
// @Method GET

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Use Sequelize's findAll method to retrieve all users
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude the password field
    });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    // Handle error safely by checking its type
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching users.",
      error: errorMessage,
    });
  }
});

export const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required." });
      return; // Ensure to stop execution after sending a response
    }

    // Simulate database operation
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
    };

    res.status(201).json({
      message: "User created successfully!",
      user: newUser,
    });
  }
);

// @Desc Login
// @Route /api/auth/
// @Method POST

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email }, // Correct Sequelize syntax
  });

  // console.log("user", user);

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  const isPasswordValid = await user.comparePassword(password);

  console.log("Raw Password Input:", password);
  console.log("Hashed Password Stored:", user.password);

  // Compare passwords
  console.log("Password Match Result:", isPasswordValid);

  if (isPasswordValid) {
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        token: generateToken(user.id.toString()), // Generate JWT
      },
    });
  } else {
    res.status(401).json({ message: "Email or password incorrect" });
  }
});

// @Desc Register
// @Route /api/auth/register
// @Method POST

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt
  // console.log("Plain Password:", password);
  // console.log("Hashed Password:", hashedPassword);

  try {
    const user = await User.create({
      email,
      fullName,
      password: password, // Store the hashed password
    });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
