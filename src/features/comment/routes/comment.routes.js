import express from "express";
import {
  deleteComment,
  fetchCommentForPost,
  newComment,
  putComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router.route("/:id").get(fetchCommentForPost);
router.route("/:id").post(newComment);
router.route("/:id").delete(deleteComment);
router.route("/:id").put(putComment);

export default router;
