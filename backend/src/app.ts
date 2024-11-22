import express from "express";
import { sequelize } from "./config/db";
import uploadRoutes from "./routes/uploadRoutes";
import userRoutes from "./routes/userRoutes";

(async () => {
  try {
    await sequelize.sync({ force: false }); // Change `force` to true if you want to recreate the table
    console.log("Database synchronized!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the user routes
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
