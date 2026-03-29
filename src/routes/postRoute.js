import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createPost, getPosts, updatePost, deletePost, likePost, unlikePost,writeComment } from "../controllers/postController.js";
const router = express.Router();
// @route   get /posts
// @desc    Show posts for the logged in user
// @access  Public
router.get("/", getPosts);

// @route   post /posts/:postID/comments
// @desc    Write a comment in the post
// @access  Private
router.post('/:postID/comments', isLoggedIn, writeComment);

// @route   post /posts
// @desc    create posts for the user
// @access  Private
router.post("/", isLoggedIn, createPost);

// @route   patch /posts/:id
// @desc    update a post for the user
// @access  Private
router.patch("/:id", isLoggedIn, updatePost);

// @route   delete /posts/:id
// @desc    delete a post for the user
// @access  Private
router.delete("/:id", isLoggedIn, deletePost);

// @route   post /posts/:postID/likes
// @desc    like a post
// @access  Private
router.post("/:postID/likes", isLoggedIn, likePost);

// @route   delete /posts/:postID/likes
// @desc    unlike a post
// @access  Private
router.delete("/:postID/likes", isLoggedIn, unlikePost);


export default router;