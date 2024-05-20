const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');
const { Review } = require('./reviewModel');
const { Order } = require('./orderModel');
const { Storage } = require('./storageModel');


const User = sequelize.define('user', {
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: true,
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


User.hasMany(Storage);
Storage.belongsTo(User); //one-to-many

User.hasMany(Review);
Review.belongsTo(User); //one-to-many

User.hasMany(Order);
Order.belongsTo(User); //one-to-many

module.exports = { User };