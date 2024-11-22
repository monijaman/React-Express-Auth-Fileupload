import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  // If the file is uploaded, you can return a response with the file path or filename
  return res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`, // Return the file path
  });
};

export const getAllFiles = (req: Request, res: Response): void => {
  const uploadsDir = path.join(__dirname, "../../uploads");
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const files = fs.readdirSync(uploadsDir);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedFiles = files.slice(startIndex, endIndex);

    const baseUrl = process.env.BASE_URL; // Get BASE_URL from env

    const fileData = paginatedFiles.map((file) => ({
      fileName: file,
      filePath: `${baseUrl}/uploads/${file}`, // Construct the full URL dynamically
    }));

    res.status(200).json({
      success: true,
      page,
      limit,
      totalFiles: files.length,
      totalPages: Math.ceil(files.length / limit),
      files: fileData,
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res
      .status(500)
      .json({ success: false, message: "Unable to retrieve files" });
  }
};
