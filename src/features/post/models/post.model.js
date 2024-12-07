import {
  getAllComments,
  getCommentsForPostId,
} from "../../comment/models/comment.model.js";
import { getAllUsers } from "../../user/models/user.model.js";

let id = 0;

export class postModel {
  constructor(userId, caption, imageUrl) {
    this.id = ++id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }
}

const posts = [
  new postModel(
    2,
    "Leaves on the ground",
    "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
  ),
  new postModel(
    3,
    "Mountain in the beach",
    "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg"
  ),
];

export const fetchAllPosts = () => {
  return posts;
};

export const getSpecificPost = (id) => {
  const result = posts?.find((p) => p.id === id);
  return result;
};

export const getUserPosts = (userId) => {
  const result = fetchAllPosts()?.find(
    (p) => Number(p.userId) === Number(userId)
  );
  return result;
};

export const createNewPost = (userId, caption, imageUrl) => {
  const user = getAllUsers().find((u) => Number(u.id) === Number(userId));
  if (!user) {
    return { success: false, msg: "No user found" };
  }
  posts.push(new postModel(userId, caption, imageUrl));
  return posts;
};

export const deletePost = (id) => {
  const postIndex = posts?.findIndex((p) => Number(p.id) === Number(id));
  if (postIndex >= 0) {
    const deletedPost = posts[postIndex];
    const allComments = getAllComments();
    if (allComments) {
      const remainingComment = allComments?.filter(
        (c) => Number(c.postId) !== Number(id)
      );
      allComments?.length === 0;
      allComments.push(remainingComment);
    }

    posts.splice(postIndex, 1);
    return { sucess: true, deletedPost: deletedPost };
  } else {
    return { sucess: false, msg: "No post found !!" };
  }
};

export const editPost = (id, caption, imageUrl) => {
  const postIndex = posts?.findIndex((p) => Number(p.id) === Number(id));
  if (postIndex >= 0) {
    posts[postIndex].caption = caption ? caption : posts[postIndex]?.caption;
    posts[postIndex].imageUrl = imageUrl ? imageUrl : posts[postIndex].imageUrl;
    return { success: true, posts: posts[postIndex] };
  } else {
    return { success: false, msg: "No post found to edit !!" };
  }
};
