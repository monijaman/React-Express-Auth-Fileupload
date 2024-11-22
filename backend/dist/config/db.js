"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // Ensure this file path is correct
    logging: console.log, // Optional: Enable logging for debugging
});
