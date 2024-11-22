import express, { NextFunction, Request, Response } from "express";
import { getAllFiles, uploadFile } from "../controllers/fileController"; // Controller method
import authenticate from "../middlewares/authenticate"; // Authentication middleware
import upload from "../utils/uploadConfig"; // Multer configuration

const router = express.Router();

// Protect the route with authentication middleware and upload a single file
router.post(
  "/upload",
  authenticate, // Authentication middleware
  upload.single("file"), // Multer file upload middleware
  (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      // Proceed to the uploadFile controller after successful file upload
      uploadFile(req, res);
    } else {
      // If no file is uploaded, return an error
      res.status(400).json({ message: "No file uploaded" });
    }
  }
);

// Route to get all files with pagination
router.get("/files", authenticate, getAllFiles);

export default router;
