const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../helpers');

const { getAllUsers, 
        getUserById, 
        getUsernameById, 
        deleteUser,  
        updateUserRole,
        updatePassword,
        updateUserInfo,
        getUser
 } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:userId', authenticateToken, getUserById);
router.get('/get-personal-info/:userId', getUser);
router.get('/get-username/:userId', getUsernameById);
router.delete('/delete-user', deleteUser);
router.put('/update-user-role', updateUserRole);
router.put('/update-password', updatePassword);
router.put('/update-user-info', updateUserInfo);

module.exports = router;