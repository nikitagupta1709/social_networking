import multer from "multer"; // Importing multer for handling file uploads

// Configure storage for uploaded files
const storage = multer.diskStorage({
  // Specify the destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Files will be stored in the 'public/uploads/' directory
  },
  // Set a unique filename for each uploaded file
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname}`; // Prefix the original filename with a timestamp
    cb(null, name);
  },
});

// Filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const typesAllowed = ["image/jpeg", "image/png", "image/gif"]; // Allowed file MIME types
  if (typesAllowed?.includes(file?.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type! Only JPEG, PNG, and GIF are allowed.")); // Reject unsupported file types
  }
};

// Multer configuration combining storage and file type filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
