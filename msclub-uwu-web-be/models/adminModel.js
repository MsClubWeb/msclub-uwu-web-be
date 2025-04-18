const db = require('../config/db');

exports.findAdminByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
};

exports.createAdmin = async (username, hashedPassword) => {
    await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);
};
