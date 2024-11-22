"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config(); // This loads the variables from your .env file
const generateToken = (id) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error("JWT secret key is not defined in environment variables.");
    }
    return jsonwebtoken_1.default.sign({ id }, secretKey, {
        expiresIn: "30d", // Set token expiration (adjust as necessary)
    });
};
exports.default = generateToken;
