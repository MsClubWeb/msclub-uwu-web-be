const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require('./Admin')(sequelize, Sequelize.DataTypes);
db.Post = require('./Post')(sequelize, Sequelize.DataTypes);

module.exports = db;
