const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Review = sequelize.define('review', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = { Review };