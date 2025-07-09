import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/profile-photos";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user-${Date.now()}${ext}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Invalid file type"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
