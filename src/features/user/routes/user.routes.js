import express from "express";
import { signUp, singIn } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(singIn);

export default router;
