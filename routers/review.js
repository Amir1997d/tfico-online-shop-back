const express = require('express');
const router = express.Router();

router.get('/:productId', getReviewsByProId);
router.post('/add-review', addRview);

module.exports = router;