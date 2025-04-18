const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // mysql2/promise pool
const auth = require('../middlewares/auth');
require('dotenv').config();

// Register Admin (for first-time setup only)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

    if (results.length > 0) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashed]);

    res.json({ msg: 'Admin registered successfully' });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login Admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

    if (results.length === 0) return res.status(400).json({ msg: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, results[0].password);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = {
      admin: {
        id: results[0].id,
        username: results[0].username,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Protected Route
router.get('/dashboard', auth, (req, res) => {
  res.json({ msg: `Welcome Admin: ${req.admin.username}` });
});

module.exports = router;
