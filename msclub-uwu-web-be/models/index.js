const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require('./Admin')(sequelize, Sequelize.DataTypes);

module.exports = db;
