import { getSpecificPost } from "../../post/models/post.model.js";

let id = 0;

export class commentShema {
  constructor(userId, postId, content) {
    this.id = ++id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
}

const comments = [
  new commentShema(1, 1, "Are wah!!"),
  new commentShema(1, 2, "Very beautiful!!"),
  new commentShema(1, 1, "GT handsome!!"),
];

export const getAllComments = () => {
  return comments;
};

export const getCommentsForPostId = (id) => {
  const isPost = getSpecificPost(Number(id));
  if (!isPost) {
    return { success: false, msg: "No post found!!" };
  }
  const result = comments?.filter((p) => Number(p.postId) === Number(id));
  if (result) {
    return { success: true, comments: result };
  } else {
    return { success: false, msg: "No comment found" };
  }
};

export const addNewComment = (userId, postId, content) => {
  const isPost = getSpecificPost(Number(postId));
  if (!isPost) {
    return { success: false, msg: "No post found!!" };
  }
  comments.push(new commentShema(userId, postId, content));
  return { success: true, comment: comments };
};

export const deleteCommentModel = (id) => {
  const commentIndex = comments?.findIndex((c) => Number(c.id) === Number(id));
  if (commentIndex >= 0) {
    const item = comments[commentIndex];
    comments.splice(commentIndex, 1);
    return { success: true, comment: item };
  } else {
    return { success: false, msg: "No comment found" };
  }
};

export const editCommentModel = (id, content) => {
  const commentIndex = comments?.findIndex((c) => Number(c.id) === Number(id));
  if (commentIndex >= 0) {
    comments[commentIndex].content = content;
    return { success: true, comments: comments };
  } else {
    return { success: false, msg: "No comment found!!" };
  }
};
