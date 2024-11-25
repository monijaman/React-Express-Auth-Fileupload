import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { File } from "../models/fileModel";

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    // Save file metadata to the database
    const savedFile = await File.create({
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`, // Construct file path
      uploadedBy: 1, // Assuming you have `req.user` for authenticated users
      // uploadedBy: req.user?.id, // Assuming you have `req.user` for authenticated users
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        id: savedFile.id,
        filename: savedFile.filename,
        filepath: savedFile.filepath,
      },
    });
  } catch (error) {
    console.error("Error saving file metadata:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save file metadata" });
  }
};


export const getAllFiles = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1; // Current page
  const limit = parseInt(req.query.limit as string) || 10; // Items per page


  try {
    // Count total files and fetch paginated datauploadFile
    const { count, rows: files } = await File.findAndCountAll({
      attributes: ["id", "filename", "filepath"], // Include only necessary fields
      offset: (page - 1) * limit, // Calculate starting point
      limit, // Limit the number of results
      order: [["createdAt", "DESC"]], // Optional: Order by creation date
    });

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalFiles: count,
      totalPages,
      files,
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({
      success: false,
      message: "Unable to retrieve files from the database",
    });
  }
}; 

export const getAllFilesfromDir = (req: Request, res: Response): void => {
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
