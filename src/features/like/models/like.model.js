import { getSpecificPost } from "../../post/models/post.model.js";

let id = 0;
export class likeSchema {
  constructor(userId, postId) {
    this.id = ++id;
    this.userId = userId;
    this.postId = postId;
  }
}

const likes = [
  new likeSchema(1, 1),
  new likeSchema(1, 2),
  new likeSchema(2, 1),
  new likeSchema(2, 2),
  new likeSchema(3, 1),
  new likeSchema(3, 2),
];

export const getPostLike = (id) => {
  const isPost = getSpecificPost(Number(id));
  if (!isPost) {
    return { success: false, msg: "No post found !!" };
  }
  const likeResults = likes?.filter((l) => Number(l.postId) === Number(id));
  if (likeResults?.length > 0) {
    return { success: true, totalLikes: likeResults };
  } else {
    return { success: false, likes: "0 Likes" };
  }
};

export const tooglePost = (userId, postId) => {
  const isPost = getSpecificPost(Number(postId));
  if (!isPost) {
    return { success: false, msg: "No post found !!" };
  }
  const existigIndex = likes?.findIndex(
    (l) =>
      Number(l.postId) === Number(postId) && Number(l.userId) === Number(userId)
  );
  if (existigIndex >= 0) {
    likes.splice(existigIndex, 1);
    return { success: true, msg: "Like removed !!" };
  } else {
    likes.push(new likeSchema(Number(userId), Number(postId)));
    return { success: true, msg: "Like added !!" };
  }
};
