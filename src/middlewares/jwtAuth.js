import jwt from "jsonwebtoken";
import { customErrorHandler } from "./errorHandler.js";

const jwtAuth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, "SocialNetworking2024", (err, decoded) => {
    if (err) {
      throw new customErrorHandler(401, "Login to continue");
      // res.status(401).json({ status: "success", msg: "Login to continue" });
    } else {
      const userData = decoded;
      req.userId = userData.userId;
      next();
    }
  });
};

export default jwtAuth;
