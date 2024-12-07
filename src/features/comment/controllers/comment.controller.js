import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import {
  addNewComment,
  deleteCommentModel,
  editCommentModel,
  getCommentsForPostId,
} from "../models/comment.model.js";

export const fetchCommentForPost = (req, res, next) => {
  const { id } = req.params;
  const result = getCommentsForPostId(id);
  if (result?.success) {
    res.status(200).json(result);
  } else {
    throw new customErrorHandler(400, result?.msg);
    // res.status(400).json(result);
  }
};

export const newComment = (req, res, next) => {
  const userId = req.userId;
  const { id } = req.params;
  const { content } = req.body;
  if (content === "") {
    res.status(400).json({ succes: false, msg: "No content entered" });
    return;
  }

  const result = addNewComment(userId, Number(id), content);
  if (result?.success) {
    res.status(200).json(result);
  } else {
    throw new customErrorHandler(400, result?.msg);
    // res.status(400).json(result);
  }
};

export const deleteComment = (req, res, next) => {
  const { id } = req.params;
  const result = deleteCommentModel(id);
  if (result?.success) {
    res.status(200).json(result);
  } else {
    throw new customErrorHandler(400, result?.msg);
    // res.status(400).json(result);
  }
};

export const putComment = (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new customErrorHandler(400, "No content available!!");
    // res.status(400).json({ success: false, msg: "No content availabel!!" });
  }
  const result = editCommentModel(id, content);
  if (result.success) {
    res.status(200).json(result);
  } else {
    throw new customErrorHandler(400, result?.msg);
    // res.status(400).json(result);
  }
};
