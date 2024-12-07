import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, "SocialNetworking2024", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: "success", msg: "Login to continue" });
    } else {
      const userData = decoded;
      req.userId = userData.userId;
      next();
    }
  });
};

export default jwtAuth;
