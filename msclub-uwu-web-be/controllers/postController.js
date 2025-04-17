const { Post } = require('../models/Post');

// GET all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE post (admin only)
exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
      category,
      userId: req.user.id
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

// UPDATE post (admin only)
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title;
    post.content = content;
    post.category = category;
    await post.save();

    res.json(post);
  } catch (err) {
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
    res.status(500).json({ message: 'Error deleting post' });
  }
};
