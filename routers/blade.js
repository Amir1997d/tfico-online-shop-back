const express = require('express');
const router = express.Router();

const { getAllBlades, addBlade } = require('../controllers/bladeController');

router.get('/', getAllBlades);
router.post('/add-blade', addBlade);

module.exports = router;