import express from "express";
import {
  addPost,
  getAllPosts,
  getOnePost,
  getUserSpecificPost,
  removePost,
  updatePost,
} from "../controllers/post.controller.js";
import upload from "../../../middlewares/file.upload.middleware.js";

const router = express.Router();

router.route("/all").get(getAllPosts);
router.route("/:id").get(getOnePost);
router.route("/").get(getUserSpecificPost);
router.route("/").post(upload.single("imageUrl"), addPost);
router.route("/:id").delete(removePost);
router.route("/:id").put(upload.single("imageUrl"), updatePost);

export default router;
