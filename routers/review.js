const express = require('express');
const router = express.Router();

const { getReviewsByProId, addReview } = require('../controllers/reviewController');

router.get('/:productId', getReviewsByProId);
router.post('/add-review', addReview);

module.exports = router;