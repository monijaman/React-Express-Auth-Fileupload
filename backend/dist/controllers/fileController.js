"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const uploadFile = (req, res) => {
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
exports.uploadFile = uploadFile;
