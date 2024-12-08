import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const typesAllowed = ["image/jpeg", "image/png", "image/gif"];
  if (typesAllowed?.includes(file?.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Inavlid file type!!. Only JPEG, PNG, and GIF are allowed."));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
