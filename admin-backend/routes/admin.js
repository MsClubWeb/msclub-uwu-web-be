const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const auth = require('../middleware/auth');
require('dotenv').config();

// Register Admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check user exists
  db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashed], (err, result) => {
      if (err) throw err;
      res.json({ msg: 'Admin registered' });
    });
  });
});

// Login Admin
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
    if (results.length === 0) return res.status(400).json({ msg: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = {
      admin: {
        id: results[0].id,
        username: results[0].username
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  });
});

// Protected Route
router.get('/dashboard', auth, (req, res) => {
  res.json({ msg: `Welcome Admin: ${req.admin.username}` });
});

module.exports = router;
