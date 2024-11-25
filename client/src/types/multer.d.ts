declare namespace Express {
    export interface Request {
      file: Express.Multer.File; // This is the type for the single file uploaded by multer
    }
  }
  