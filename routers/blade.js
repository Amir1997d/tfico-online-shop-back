const express = require('express');
const router = express.Router();

const { getAllProducts, getAllBlades, addBlade, deleteBlade } = require('../controllers/bladeController');

router.get('/products', getAllProducts);

router.get('/', getAllBlades);
router.post('/add-blade', addBlade);
router.delete('/delete-blade/:id', deleteBlade);

module.exports = router;