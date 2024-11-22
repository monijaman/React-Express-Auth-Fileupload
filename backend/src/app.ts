import express from "express";
import cors from "cors";
import { sequelize } from "./config/db";
import uploadRoutes from "./routes/uploadRoutes";
import userRoutes from "./routes/userRoutes";

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Database synchronization
(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true to recreate tables
    console.log("Database synchronized!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
