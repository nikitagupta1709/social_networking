import express from "express";
import { addDelete, getAllPostLikes } from "../controllers/like.controller.js";

const router = express.Router();

router.route("/:postId").get(getAllPostLikes);
router.route("/toggle/:postId").get(addDelete);

export default router;
