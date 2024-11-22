import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // Ensure this file path is correct
  logging: console.log, // Optional: Enable logging for debugging
});
