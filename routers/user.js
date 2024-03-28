const express = require('express');
const router = express.Router();

const { getAllUsers, 
        getUserById, 
        getUsernameById, 
        deleteUser,  
        updateUserRole,
        login,
        signup,
        updatePassword
 } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/get-username/:userId', getUsernameById);
router.post('/sign-up', signup);
router.post('/login', login);
router.delete('/delete-user', deleteUser);
router.put('/update-user-role', updateUserRole);
router.put('/update-password', updatePassword);

module.exports = router;