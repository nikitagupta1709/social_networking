import express from "express";
import {
  addPost,
  getAllPosts,
  getOnePost,
  getUserSpecificPost,
  removePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/all").get(getAllPosts);
router.route("/:id").get(getOnePost);
router.route("/").get(getUserSpecificPost);
router.route("/").post(addPost);
router.route("/:id").delete(removePost);
router.route("/:id").put(updatePost);

export default router;
