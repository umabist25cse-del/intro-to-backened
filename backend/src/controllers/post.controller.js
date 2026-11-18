import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body ?? {};

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "Name, description and age are required",
      });
    }

    const post = await Post.create({ name, description, age });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updatePost = async (req, res) => {
  try {
    const changes = req.body ?? {};

    if (Object.keys(changes).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: changes },
      { returnDocument: "after", runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    if (error.name === "CastError" || error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post successfully deleted",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};
export { createPost, getPosts, updatePost, deletePost };