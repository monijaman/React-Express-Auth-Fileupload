import express, { NextFunction, Request, Response } from "express";
import { uploadFile } from "../controllers/fileController"; // Controller method
import authenticate from "../middlewares/authenticate"; // Authentication middleware
import upload from "../utils/uploadConfig"; // Multer configuration

const router = express.Router();

// Protect the route with authentication middleware and upload a single file
router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    // Custom error handling for upload.single
    upload.single("file")(req, res, (err: any) => {
      if (err) {
        // Handle the error if there is one
        return next(err); // Pass the error to the next middleware (error handler)
      }
      // Proceed to the uploadFile controller after successful file upload
      uploadFile(req, res); // Call with only req and res
    });
  }
);

export default router;
