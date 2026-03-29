import express from "express";
import { userSignUp, logIn } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const router = express.Router();
// @route   POST /users
// @desc    Register a new user
// @access  Public
router.post("/", userSignUp);

// @route   POST /users/auth
// @desc    Log in an existing user
// @access  Public
router.post("/auth", logIn);


export default router;