const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middlewares/auth');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/dashboard', auth, adminController.dashboard);

module.exports = router;
