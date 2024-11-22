import multer from "multer";
import path from "path";
import fs from 'fs';
 // Define the storage configuration
 const uploadDir = path.join(__dirname, 'uploads');


const storage = multer.diskStorage({

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload folder
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName); // Generate a unique filename based on the timestamp
  },
});

// Filter to only allow certain file types (e.g., images)
const fileFilter = (req: any, file: any, cb: Function) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("File type not allowed"), false);
  }
  cb(null, true);
};

// Create the multer instance with the configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});

export default upload;
