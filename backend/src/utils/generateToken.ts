import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config(); // This loads the variables from your .env file

const generateToken = (id: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT secret key is not defined in environment variables.");
  }

  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d", // Set token expiration (adjust as necessary)
  });
};

export default generateToken;
