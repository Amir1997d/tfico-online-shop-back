const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const Order = sequelize.define('order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(13,2),
        allowNull: false,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = { Order };