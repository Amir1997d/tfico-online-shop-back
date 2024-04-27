const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const RefreshToken = sequelize.define('refresh', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { RefreshToken };