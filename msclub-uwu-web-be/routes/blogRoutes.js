const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/', blogController.getAllPosts);

router.post('/', auth,upload('blogs').single('bannerImage') ,blogController.createPost);
router.put('/:id', auth,auth,upload('blogs').single('bannerImage'), blogController.updatePost);
router.delete('/:id', auth, blogController.deletePost);

module.exports = router;
