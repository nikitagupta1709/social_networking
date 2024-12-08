import { getSpecificPost } from "../../post/models/post.model.js";

let id = 0;

// Comment schema class to structure comment data
export class commentShema {
  constructor(userId, postId, content) {
    this.id = ++id; // Auto-incremented comment ID
    this.userId = userId; // User ID of the commenter
    this.postId = postId; // Post ID where the comment belongs
    this.content = content; // The comment's content
  }
}

// In-memory array of comments
const comments = [
  new commentShema(1, 1, "Are wah!!"),
  new commentShema(1, 2, "Very beautiful!!"),
  new commentShema(1, 1, "Good morning!!"),
];

// Fetch all comments
export const getAllComments = () => {
  return comments;
};

// Fetch comments for a specific post by postId
export const getCommentsForPostId = (id) => {
  const isPost = getSpecificPost(Number(id)); // Check if the post exists
  if (!isPost) {
    return { success: false, msg: "No post found!!" }; // Return error if post is not found
  }
  const result = comments?.filter((p) => Number(p.postId) === Number(id)); // Filter comments by postId
  if (result) {
    return { success: true, comments: result }; // Return filtered comments
  } else {
    return { success: false, msg: "No comment found" }; // Return error if no comments found
  }
};

// Add a new comment to a specific post
export const addNewComment = (userId, postId, content) => {
  const isPost = getSpecificPost(Number(postId)); // Check if the post exists
  if (!isPost) {
    return { success: false, msg: "No post found!!" }; // Return error if post is not found
  }
  comments.push(new commentShema(userId, postId, content)); // Add new comment to the array
  return { success: true, comment: comments }; // Return updated comments array
};

// Delete a specific comment by commentId
export const deleteCommentModel = (id) => {
  const commentIndex = comments?.findIndex((c) => Number(c.id) === Number(id)); // Find the index of the comment
  if (commentIndex >= 0) {
    const item = comments[commentIndex]; // Get the comment to be deleted
    comments.splice(commentIndex, 1); // Remove comment from array
    return { success: true, comment: item }; // Return deleted comment
  } else {
    return { success: false, msg: "No comment found" }; // Return error if comment is not found
  }
};

// Edit the content of a specific comment
export const editCommentModel = (id, content) => {
  const commentIndex = comments?.findIndex((c) => Number(c.id) === Number(id)); // Find the index of the comment
  if (commentIndex >= 0) {
    comments[commentIndex].content = content; // Update the content of the comment
    return { success: true, comments: comments }; // Return updated comments array
  } else {
    return { success: false, msg: "No comment found!!" }; // Return error if comment is not found
  }
};
