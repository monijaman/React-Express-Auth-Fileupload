"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.createUser = exports.getAll = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../models/userModel");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @Desc Get all users
// @Route /api/auth
// @Method GET
exports.getAll = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use Sequelize's findAll method to retrieve all users
        const users = yield userModel_1.User.findAll({
            attributes: { exclude: ["password"] }, // Exclude the password field
        });
        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    }
    catch (error) {
        // Handle error safely by checking its type
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching users.",
            error: errorMessage,
        });
    }
}));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
// @Desc Login
// @Route /api/login/
// @Method POST
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.User.findOne({
        where: { email }, // Correct Sequelize syntax
    });
    // console.log("user", user);
    if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
    }
    const isPasswordValid = yield user.comparePassword(password);
    if (isPasswordValid) {
        res.status(201).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                token: (0, generateToken_1.default)(user.id.toString()), // Generate JWT
            },
        });
    }
    else {
        res.status(401).json({ message: "Email or password incorrect" });
    }
}));
// @Desc Register
// @Route /api/register
// @Method POST
exports.register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const user = yield userModel_1.User.create({
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
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
