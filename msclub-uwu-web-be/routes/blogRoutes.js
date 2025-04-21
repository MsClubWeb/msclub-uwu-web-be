const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
// const auth = require('../middlewares/auth');

// 👀 Everyone can read
// router.get('/', auth(), postController.getAllPosts);

// // 🔐 Admin only actions
// router.post('/', auth(['admin']), postController.createPost);
// router.put('/:id', auth(['admin']), postController.updatePost);
// router.delete('/:id', auth(['admin']), postController.deletePost);

module.exports = router;
