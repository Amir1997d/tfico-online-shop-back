const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Storage = sequelize.define('storage', {
  group: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL(13,3),
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = { Storage };