const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Blade = sequelize.define('blade', {
    dementions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alloySteelCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idealFor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hardnessRanges: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

module.exports = { Blade };