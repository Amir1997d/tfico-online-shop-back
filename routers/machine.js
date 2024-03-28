const express = require('express');
const router = express.Router();

const { getAllMachines, addMachine, deleteMachine, updateMachine, getMachineById } = require('../controllers/machineController');

router.get('/', getAllMachines);
router.get('/:machineId', getMachineById);
router.post('/add-machine', addMachine);
router.delete('/delete-machine/:id', deleteMachine);
router.put('/update-machine/:id', updateMachine);

module.exports = router;