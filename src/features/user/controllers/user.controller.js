import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import { loginUser, registerUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const signUp = (req, res, next) => {
  const userData = req.body;
  if (userData?.email && userData?.name && userData?.password) {
    let user = registerUser(userData);
    res.status(201).send({ status: "success", user });
  } else {
    throw new customErrorHandler(400, "Invalid user details !!");
    // res.status(400).json({ status: "failure", msg: "invalid user details;" });
  }
};

export const singIn = (req, res, next) => {
  let user = loginUser(req.body);
  if (user) {
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email },
      "SocialNetworking2024",
      { expiresIn: "3h" }
    );
    res
      .status(201)
      .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
      .cookie("userId", user.id, { maxAge: 900000, httpOnly: false })
      .json({ status: "success", msg: "Login successful", token });
  } else {
    throw new customErrorHandler(400, "Invalid user details !!");
    // res.status(400).json({ status: "failure", msg: "invalid user deatils" });
  }
};
