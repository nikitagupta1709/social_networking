import {
  createNewPost,
  deletePost,
  editPost,
  fetchAllPosts,
  getSpecificPost,
  getUserPosts,
} from "../models/post.model.js";

export const getAllPosts = (req, res, next) => {
  const posts = fetchAllPosts();
  if (posts?.length > 0) {
    res.status(200).json({ success: true, posts });
  } else {
    res.status(400).json({ success: true, msg: "No posts found" });
  }
};

export const getOnePost = (req, res, next) => {
  const { id } = req.params;
  const result = getSpecificPost(Number(id));
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(400).json({ success: false, msg: "No post found!!" });
  }
};

export const getUserSpecificPost = (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ success: false, msg: "No user found" });
  }
  const result = getUserPosts(userId);
  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res
      .status(400)
      .json({ status: false, msg: "No post found for logged in user!!" });
  }
};

export const addPost = (req, res, next) => {
  const userId = req.userId;
  const { caption, imageUrl } = req.body;
  // Add validation for image url
  const result = createNewPost(userId, caption, imageUrl);
  res.status(200).json({ success: true, posts: result });
};

export const removePost = (req, res, next) => {
  const { id } = req.params;
  const result = deletePost(id);
  if (result?.status) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

export const updatePost = (req, res, next) => {
  const { id } = req.params;
  const { caption, imageUrl } = req.body;
  const result = editPost(id, caption, imageUrl);
  if (result?.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};
