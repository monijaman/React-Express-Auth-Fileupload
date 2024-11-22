"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileController_1 = require("../controllers/fileController"); // Controller method
const authenticate_1 = __importDefault(require("../middlewares/authenticate")); // Authentication middleware
const uploadConfig_1 = __importDefault(require("../utils/uploadConfig")); // Multer configuration
const router = express_1.default.Router();
// Protect the route with authentication middleware and upload a single file
router.post("/upload", authenticate_1.default, uploadConfig_1.default.single("file"), (req, res, next) => {
    // Custom error handling for upload.single
    uploadConfig_1.default.single("file")(req, res, (err) => {
        if (err) {
            // Handle the error if there is one
            return next(err); // Pass the error to the next middleware (error handler)
        }
        // Proceed to the uploadFile controller after successful file upload
        (0, fileController_1.uploadFile)(req, res); // Call with only req and res
    });
});
exports.default = router;
