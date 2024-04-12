const { Order } = require('../models/orderModel');
const { Product } = require('../models/productModel');
const { User } = require('../models/userModel');
const { Op } = require('sequelize');

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.orderId
            },
            include: [Product, User]
        });
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Unable to fetch order' });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [Product, User]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Unable to fetch orders' });
    }
}

const getAllActiveOrders = async (req, res) => {
    try {
        const activeOrders = await Order.findAll({
            where: {
                status: {
                  [Op.not]: 'closed'
                }
              },
              include: [Product]
        });
        res.status(200).json(activeOrders);
    } catch (error) {
        console.error('Error fetching active orders:', error);
        res.status(500).json({ error: 'Unable to fetch active orders' });
    }
}

const getAllUserOrder = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.params.userId
            },
            include: [Product]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user\'s orders:', error);
        res.status(500).json({ error: 'Unable to fetch user\'s orders' });
    }
}

const addOrder = async (req, res) => {
    try {
      const products = req.body;
      const userId = req.params.userId;
      const orderPromises = products.map(product => {
        const currentDate = new Date();
        const formattedOrderDate = formatDate(currentDate);
        const newOrder = {
          title: product.title,
          quantity: product.quantity,
          status: product.status,
          totalPrice: product.totalPrice,
          deliveryAddress: product.deliveryAddress,
          paymentStatus: product.paymentStatus,
          productId: product.productId,
          userId,
          orderDate: formattedOrderDate,
        };
        return Order.create(newOrder);
      });
      const orders = await Promise.all(orderPromises);
      res.status(200).json({ message: 'Orders created successfully' });
    } catch (error) {
      console.error("Error creating orders:", error);
      res.status(500).json({ error: 'Unable to create orders' });
    }
};

const updateOrder = async (req, res) => {
    const {
        title,
        quantity,
        status,
        totalPrice,
        deliveryAddress,
        paymentStatus,
        productId,
        userId,
    } = req.body;

    try {
        const order = await Order.findOne({
            where: {
                id: req.params.orderId
            }
        });
        if(!order) {
            return res.status(404).json({message: 'order not found!'});
        }
        const updatedOrder = await order.update({
            title,
            quantity,
            status,
            totalPrice,
            deliveryAddress,
            paymentStatus,
            productId,
            userId,
        })
        res.status(201).json({message: 'order is updated'});
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: 'Unable to update order' });
    }
}

const deleteOrder = async (req, res) => {
    try {
        await Order.destroy({
            where: {
                id: req.params.orderId
            }
        });
        res.status(202).json({ message: 'Order is deleted!'});
    } catch(error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: 'Unable to delete order' });
    }
}

const updateStatus = async (req, res) => {
    const {
        status,
    } = req.body;

    try {
        const order = await Order.findOne({
            where: {
                id: req.params.orderId
            }
        });
        if(!order) {
            return res.status(404).json({message: 'order not found!'});
        }
        const updatedOrder = await order.update({
            status,
        })
        res.status(201).json({message: 'order\'s status is updated'});
    } catch (error) {
        console.error("Error updating order\'s status:", error);
        res.status(500).json({ error: 'Unable to update order\'s status' });
    }
}

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} at ${hours}:${minutes}`;
};

module.exports = {
    getOrderById,
    getAllOrders,
    getAllActiveOrders, 
    getAllUserOrder, 
    addOrder, 
    updateOrder, 
    deleteOrder,
    updateStatus
}