const { Product } = require('../models/productModel');
const { ProductRating } = require('../models/productRatingModel');

const getRating = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const rated = await ProductRating.findOne({
      where: { productId, userId }
    });
    if(rated) {
      res.status(200).json({ message: "rating is founded!" });
    }
  } catch (error) {
    console.error('Error finding the rating:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
}

const addRating = async (req, res) => {
  try {
    const { rating, productId, userId } = req.body;
    await ProductRating.create({
      rating,
      productId,
      userId,
    });
    res.status(201).json({ message: "rating is added!" });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Unable to add rating' });
  }
}

const calAndUpdateAvgRating = async (req, res) => {
  let avgRating = null;
  let sum = 0;
  try{
    const { count, rows } = await ProductRating.findAndCountAll({
      where: { productId: req.params.productId }
    });
    if (count === 1) {
      avgRating = rows[0].rating;
    }
    else if(count > 1){
      const ratings = rows.map(row => row.rating);
      const reducer = (accumulator, curr) => accumulator + curr;
      sum = ratings.reduce(reducer);
      avgRating = sum / count;
    }
    await Product.update({ avgRate: avgRating }, {
      where: { id: req.params.productId }
    });
    res.status(201).json({ avgRate: avgRating , message: "average rating is calculated and updated!" });
  } catch(error) {
    console.error('Error calculating average rating:', error);
    res.status(500).json({ error: 'Unable to add rating' });
  }
}

module.exports = {
  getRating,
  addRating,
  calAndUpdateAvgRating,
}