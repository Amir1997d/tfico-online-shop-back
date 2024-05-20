const express = require('express');
const router = express.Router();

const { getStorage, addElement, updateElement, deleteElement, getElementById } = require('../controllers/storageController');

router.get('/', getStorage);
router.get('/:elementId', getElementById);
router.post('/add-element', addElement);
router.put('/update-element/:elementId', updateElement);
router.delete('/delete-element/:elementId', deleteElement);

module.exports = router;