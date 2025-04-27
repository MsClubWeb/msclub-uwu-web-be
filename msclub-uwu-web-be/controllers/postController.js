const { Post } = require('../models');
require('dotenv').config();

// GET all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE post (admin only)
exports.createPost = async (req, res) => {
  const {
    category,
    title,
    bannerDescription,
    bannerImage,
    date,
    authorName,
    description
  } = req.body;

  try {
    const post = await Post.create({
      category,
      title,
      bannerDescription,
      bannerImage,
      date,
      authorName,
      description
    });
    res.status(201).json(post);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post' });
  }
};

// UPDATE post (admin only)
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const {
    category,
    title,
    bannerDescription,
    bannerImage,
    date,
    authorName,
    description
  } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.category = category;
    post.title = title;
    post.bannerDescription = bannerDescription;
    post.bannerImage = bannerImage;
    post.date = date;
    post.authorName = authorName;
    post.description = description;

    await post.save();

    res.json(post);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Error updating post' });
  }
};

// DELETE post (admin only)
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.destroy();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Error deleting post' });
  }
};
