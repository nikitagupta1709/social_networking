import express from "express";
import {
  addPost,
  getAllPosts,
  getOnePost,
  getUserSpecificPost,
  removePost,
  updatePost,
} from "../controllers/post.controller.js";
import upload from "../../../middlewares/file.upload.middleware.js"; // Import file upload middleware

const router = express.Router();

// Route to get all posts
router.route("/all").get(getAllPosts); // GET /posts/all

// Route to get a single post by its ID
router.route("/:id").get(getOnePost); // GET /posts/:id

// Route to get posts for the currently authenticated user
router.route("/").get(getUserSpecificPost); // GET /posts

// Route to create a new post, with an optional image upload
router.route("/").post(upload.single("imageUrl"), addPost); // POST /posts (image is uploaded as "imageUrl")

// Route to delete a post by its ID
router.route("/:id").delete(removePost); // DELETE /posts/:id

// Route to update a post by its ID, with an optional image upload
router.route("/:id").put(upload.single("imageUrl"), updatePost); // PUT /posts/:id (image is uploaded as "imageUrl")

export default router;
