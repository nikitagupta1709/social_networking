import cookieParser from "cookie-parser";
import express from "express";
import userRoutes from "./src/features/user/routes/user.routes.js";
import postRoutes from "./src/features/post/routes/post.route.js";
import jwtAuth from "./src/middlewares/jwtAuth.js";
import commentRoutes from "./src/features/comment/routes/comment.routes.js";
import likeRoutes from "./src/features/like/routes/like.routes.js";
import {
  customErrorHandler,
  errorHandlerMiddleware,
} from "./src/middlewares/errorHandler.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoutes.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api/posts", jwtAuth, postRoutes);
app.use("/api/comments", jwtAuth, commentRoutes);
app.use("/api/likes", jwtAuth, likeRoutes);

app.get("/test-custom-error", (req, res) => {
  throw new customErrorHandler(
    505,
    "testing app level custom error handling middleware"
  );
});

app.get("/test-unhandled-error", (req, res) => {
  throw "Unknown Server Error";
});

app.use(invalidRoutesHandlerMiddleware);
app.use(errorHandlerMiddleware);
export default app;
