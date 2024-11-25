import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { sequelize } from "./config/db";
import uploadRoutes from "./routes/uploadRoutes";
import userRoutes from "./routes/userRoutes";
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'; // Import auth routes
// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Define the upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Ensure the upload directory exists at startup
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
  console.log(`Created missing upload directory at: ${uploadDir}`);
} else {
  console.log(`Upload directory exists at: ${uploadDir}`);
}

// Database synchronization
(async () => {
  try {
    await sequelize.sync({ force: false }); // Set force to true to recreate tables
    console.log("Database synchronized!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

console.log("Static files served from:", path.resolve(__dirname, "../uploads"));
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);
app.use('/api', authRoutes); // Mount the routes under /api prefix

// Serve static files from the 'uploads' directory
// app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
