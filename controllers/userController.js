const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
require('dotenv').config();

const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Unable to fetch users' });
    }
}

const getUserById = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.userId
        }
      });
      const responseUser = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      }
      res.status(200).json(responseUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Unable to fetch user' });
    }
}

const getUser = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.params.userId
      }
    });
    if(!user) {
      return res.status(404).json({ message: "User does not exist!"});
    }
    const responseUser = {
      id: user.id,
      username: user.username,
      firstName: user.firstName, 
      lastName: user.lastName, 
      email: user.email, 
      phone: user.phone, 
      postalCode: user.postalCode, 
      city: user.city, 
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
    res.status(200).json(responseUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Unable to fetch user' });
  }
}

const getUsernameById = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.userId
        }
      });
      res.status(200).json(user.username);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Unable to fetch user' });
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        await User.destroy({
          where: {
            id: userId
          }
        });
        res.status(202).json({ message: "user is deleted!" });
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Unable to delete user' });
      }
}

const updateUserRole = async (req, res) => {
    try {
        const { userId, isAdmin } = req.body; 
        await User.update({ isAdmin }, {
            where: {
                id: userId
            }
        });
        res.status(200).json({ message: "user role is updated!" });
    } catch(error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Unable to update user role' });
    }
}

const updatePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword },
    {
      where: {
        id: userId
      }
    });
    res.status(201).json({ message: 'Password is updated!'});
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Unable to update password!' });
  }
}

const updateUserInfo = async (req, res) => {
  try {
    const { 
      userId,
      firstName,
      lastName,
      email,
      phone,
      city,
      postalCode,
      address 
    } = req.body;
    
    await User.update({ firstName, lastName, email, phone, postalCode, city, address},
    {
      where: {
        id: userId
      }
    });
    res.status(201).json({ message: 'Password is updated!'});
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Unable to update password!' });
  }
}


module.exports = {
    getAllUsers,
    getUserById,
    getUsernameById,
    deleteUser,
    updateUserRole,
    updatePassword,
    updateUserInfo,
    getUser
}