const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const { Review } = require('./reviewModel');
const { Order } = require('./orderModel');


const User = sequelize.define('user', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    yandexId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

// User.hasMany(Review);
// Review.belongsTo(User); //one-to-many

// User.hasMany(ProductRating);
// ProductRating.belongsTo(User); //one-to-many

User.hasMany(Order);
Order.belongsTo(User); //one-to-many

module.exports = { User };