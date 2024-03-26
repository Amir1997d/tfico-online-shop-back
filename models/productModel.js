const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const { Machine } = require('./machineModel');
const { Blade } = require('./bladeModel');
const { Review } = require('./reviewModel');
const { Order } = require('./orderModel');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(13,2),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
});

Product.hasMany(Blade);
Blade.belongsTo(Product);

Product.hasMany(Machine);
Machine.belongsTo(Product);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.hasOne(Order);
Order.belongsTo(Product);

module.exports = { Product };