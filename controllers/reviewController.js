const { Review } = require('../models/reviewModel');

const getReviewsByProId = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                productId: req.params.productId
            }
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Unable to fetch reviews' });
    }
}

const addReview = (req, res) => {
    const { userId, productId, username, text } = req.body;
    try {
        const review = await Review.create({
            userId,
            productId,
            username,
            text
        });
        res.status(201).json({message: 'Review is added!'});
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Unable to add review' });
    }
}

module.exports = {
    getReviewsByProId,
    addReview
}