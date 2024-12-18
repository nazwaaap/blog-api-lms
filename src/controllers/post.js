import Post from "../models/post.js";
import { uploadRemover } from "../utils/uploadRemover.js";

// Create a new post
export const createPost = async (req, res) => {
    const { title, body } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const post = new Post({ title, body, image });
        const savedPost = await post.save();

        return res.status(201).json({
            message: "Post created",
            data: savedPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to create post" });
    }
}

// Get all posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({
            message: "Posts found",
            data: posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch posts" });
    }
}

// Get a post by its ID
export const getPostById = async (req, res) => {
    const postId = req.params.id;  // Pastikan menggunakan 'id' yang sesuai dengan route

    try {
        const post = await Post.findById(postId);  // Gunakan postId untuk mencari post

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({
            message: "Post found",
            data: post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving post" });
    }
}

export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { title, body } = req.body
    const newImage = req.file ? req.file.filename : null 

    try {
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: "Post not found"})
        }

        if (newImage) {
            uploadRemover(post.image)
        }

        post.title = title
        post.body = body
        post.image = newImage ? newImage : post.image

        const updatePost = await post.save()

        return res.status(200).json({
            message: "Post updated",
            data: updatePost
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error updating post"})
    }
}

export const deletePost = async (req, res) => {
    const postId = req.params.id;

    try {

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error deleting post"})
    }
}