import { Request, Response } from "express";
import multer from "multer";
import { File } from "../models/fileModel";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage }).single("file");

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  upload(req, res, async (err) => {
    if (err) {
      res
        .status(500)
        .json({ error: "File upload failed", details: err.message });
      return;
    }

    try {
      const file = await File.create({
        filename: req.file!.filename,
        filepath: req.file!.path,
        uploadedBy: req.body.userId,
      });
      res.status(201).json({ message: "File uploaded successfully", file });
    } catch (error) {
      res
        .status(500)
        .json({ error: "File save failed", details: error.message });
    }
  });
};
