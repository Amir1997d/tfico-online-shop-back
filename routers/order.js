const express = require('express');
const router = express.Router();

const { 
    getOrderById, 
    getAllOrders, 
    getAllActiveOrders, 
    getAllUserOrder, 
    addOrder, 
    updateOrder, 
    deleteOrder,
    updateStatus
} = require('../controllers/orderController');

router.get('/:orderId', getOrderById);
router.get('/', getAllOrders);
router.get('/user-orders/:userId', getAllUserOrder);
router.post('/active-orders', getAllActiveOrders);
router.post('/add-order/:userId', addOrder);
router.put('/update-order/:orderId', updateOrder);
router.delete('/delete-order/:orderId', deleteOrder);
router.put('/update-status/:orderId', updateStatus);


module.exports = router;