import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import Post from "../models/postModel.js";
const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200);
  res.json({ "message": "Posts retrieved successfully", posts });
};

const createPost = expressAsyncHandler(async (req, res) => {
  const { title, content, tags, category } = req.body;
  if (!title || !content || !tags || !category) {
    res.status(400);
    throw new Error("Fields are not filled properly");
  }
  const slug = slugify(title, '_', { lower: true, strict: true });
  const data = {
    title,
    content,
    tags,
    category,
    slug,
    author: req.user._id
  }
  const post = await Post.create(data);
  res.status(201);
  res.json({ "message": "Post created successfully", post });
});

const updatePost = expressAsyncHandler(async (req, res) => {
  const { title, content, tags, category } = req.body;
  const { id } = req.params;
  if (!title || !content || !tags || !category) {
    res.status(400);
    throw new Error("Fields are not filled properly");
  }
  const slug = slugify(title, '_', { lower: true, strict: true });

  const post = await Post.findByIdAndUpdate(id, { title, slug, content, tags, category }, { new: true });

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.json({ "message": "Post updated successfully", post });
});

const deletePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.json({ "message": "Post deleted successfully", post });
});

const likePost = expressAsyncHandler(async (req, res) => {
  const { postID } = req.params;
  const post = await Post.findById(postID);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    if (post.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error("Post already liked");
    }
    post.likes.push(req.user._id);
    await post.save();
    res.json({ "message": "Post liked successfully", post });
  }
});
const unlikePost = expressAsyncHandler(async (req, res) => {
  const { postID } = req.params;
  const post = await Post.findById(postID);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  } else {
    if (!post.likes.includes(req.user._id)) {
      res.status(400);
      throw new Error("Post not liked");
    }
    post.likes = post.likes.filter((id) => id !== req.user._id);
    await post.save();
    res.json({ "message": "Post unliked successfully", post });
  }
});

const writeComment = expressAsyncHandler(async (req, res) => {
  const { postID } = req.params;
  const { comment } = req.body;
  if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
    res.status(400);
    throw new Error("Comment is required and must be a non-empty string");
  }
  const post = await Post.findById(postID);
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
  const commentData = { comment: comment.trim(), author: req.user._id };
  post.comments.push(commentData);
  await post.save();
  res.status(201).json({ message: "Comment added successfully", comment: commentData });
});
export { getPosts, createPost, updatePost, deletePost, likePost, unlikePost, writeComment };