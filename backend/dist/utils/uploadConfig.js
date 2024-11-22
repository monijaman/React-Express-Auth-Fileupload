"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Define the storage configuration
const uploadDir = path_1.default.join(__dirname, 'uploads');
const storage = multer_1.default.diskStorage({
    if(, fs) { }, : .existsSync(uploadDir)
}), { fs, mkdirSync };
(uploadDir);
destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload folder
},
    filename;
(req, file, cb) => {
    const fileExtension = path_1.default.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName); // Generate a unique filename based on the timestamp
},
;
;
// Filter to only allow certain file types (e.g., images)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("File type not allowed"), false);
    }
    cb(null, true);
};
// Create the multer instance with the configuration
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});
exports.default = upload;
