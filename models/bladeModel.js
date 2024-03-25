const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Blade = sequelize.define('blade', {
    dementions: {
        type: DataTypes.INTEGER,
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
    IdealFor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    HardnessRanges: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = { Blade };