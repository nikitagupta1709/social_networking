import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import { getPostLike, tooglePost } from "../models/like.model.js";

export const getAllPostLikes = (req, res, next) => {
  const { postId } = req.params;
  const result = getPostLike(postId);
  if (result?.success) {
    res.status(200).json(result);
  } else {
    throw new customErrorHandler(400, result?.msg);
    // res.status(400).json(result);
  }
};

export const addDelete = (req, res, next) => {
  const userId = req.userId;
  const { postId } = req.params;
  const result = tooglePost(userId, postId);
  if (result?.success) {
    res.status(200).json(result);
  } else {
    throw new customErrorHandler(400, result?.msg);
    // res.status(400).json(result);
  }
};
