const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
require('dotenv').config();

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) return res.status(400).json({ msg: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashedPassword });

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(400).json({ msg: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = {
      admin: { id: admin.id, username: admin.username },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.dashboard = (req, res) => {
  res.json({ msg: `Welcome Admin: ${req.admin.username}` });
};
