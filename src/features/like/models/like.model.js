import { getSpecificPost } from "../../post/models/post.model.js";

// Variable to keep track of the unique id for each like
let id = 0;

// Like schema to represent a like by a user on a post
export class likeSchema {
  constructor(userId, postId) {
    this.id = ++id; // Increment id for every new like
    this.userId = userId; // User who liked the post
    this.postId = postId; // Post that was liked
  }
}

// Sample data representing likes on posts by users
const likes = [
  new likeSchema(1, 1),
  new likeSchema(1, 2),
  new likeSchema(2, 1),
  new likeSchema(2, 2),
  new likeSchema(3, 1),
  new likeSchema(3, 2),
];

// Function to get all likes for a specific post by postId
export const getPostLike = (id) => {
  // Check if the post exists using the post id
  const isPost = getSpecificPost(Number(id));
  if (!isPost) {
    return { success: false, msg: "No post found !!" }; // If the post doesn't exist, return an error message
  }

  // Filter the likes array to find likes related to the given postId
  const likeResults = likes?.filter((l) => Number(l.postId) === Number(id));

  // If likes exist for the post, return them; otherwise, indicate no likes
  if (likeResults?.length > 0) {
    return { success: true, totalLikes: likeResults };
  } else {
    return { success: false, likes: "0 Likes" }; // No likes found
  }
};

// Function to toggle the like status for a specific user and post
export const tooglePost = (userId, postId) => {
  // Check if the post exists using the postId
  const isPost = getSpecificPost(Number(postId));
  if (!isPost) {
    return { success: false, msg: "No post found !!" }; // If the post doesn't exist, return an error message
  }

  // Find if the user has already liked the post by checking the likes array
  const existigIndex = likes?.findIndex(
    (l) =>
      Number(l.postId) === Number(postId) && Number(l.userId) === Number(userId)
  );

  // If the user has already liked the post, remove the like; otherwise, add the like
  if (existigIndex >= 0) {
    likes.splice(existigIndex, 1); // Remove the like
    return { success: true, msg: "Like removed !!" }; // Return a message that the like was removed
  } else {
    likes.push(new likeSchema(Number(userId), Number(postId))); // Add a new like
    return { success: true, msg: "Like added !!" }; // Return a message that the like was added
  }
};
