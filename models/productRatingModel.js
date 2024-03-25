const { sequelize } = require('../db');
const { DataTypes } = require('sequelize');

const ProductRating = sequelize.define('product_rating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  }
}, {
  timestamps: false
});

module.exports = { UserReviewRating };