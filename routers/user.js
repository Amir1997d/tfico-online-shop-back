const express = require('express');
const router = express.Router();

const { getAllUsers, 
        getUserById, 
        getUsernameById,
        updatePreferredLang, 
        deleteUser, 
        updateUserStatus, 
        updateUserRole } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/get-username/:userId', getUsernameById);
router.put('/preferred-lang', updatePreferredLang);
router.delete('/delete-user', deleteUser);
router.put('/user-status', updateUserStatus);
router.put('/user-role', updateUserRole);

module.exports = router;