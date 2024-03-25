const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Machine = sequelize.define('machine', {
    machineType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    warranty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cnc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = { Machine };