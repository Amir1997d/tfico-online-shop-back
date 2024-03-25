const express = require('express');
const router = express.Router();

const { getAllMachines, addMachine, deleteMachine, updateMachine } = require('../controllers/machineController');

router.get('/', getAllMachines);
router.post('/add-machine', addMachine);
router.delete('/delete-machine/:id', deleteMachine);
router.put('/update-machine/:id', updateMachine);

module.exports = router;