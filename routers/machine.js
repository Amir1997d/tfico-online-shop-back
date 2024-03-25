const express = require('express');
const router = express.Router();

const { getAllMachines, addMachine, deleteMachine } = require('../controllers/machineController');

router.get('/', getAllMachines);
router.post('/add-machine', addMachine);
router.delete('/delete-machine/:id', deleteMachine);

module.exports = router;