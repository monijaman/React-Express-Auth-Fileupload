import path from "path";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database.sqlite"),
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("SQLite Connected");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
