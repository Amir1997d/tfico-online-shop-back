const express = require('express');
const router = express.Router();

const { getAllMachines, addMachine } = require('../controllers/machineController');

router.get('/', getAllMachines);
router.post('/add-machine', addMachine);

module.exports = router;