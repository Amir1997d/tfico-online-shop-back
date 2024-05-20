const { Product } = require('../models/productModel');
const { Storage } = require('../models/storageModel');

const getStorage = async (req, res) => {
  try {
    const storage = await Storage.findAll();
    res.status(200).json({ storage });
  } catch (error) {
    console.error('Error fetching storage:', error);
    res.status(500).json({ error: 'Unable to fetch storage!' });
  }  
}

const getElementById = async (req, res) => {
  try {
    const element = await Storage.findOne({ where: {id: req.params.elementId }});
    if(!element) {
      return res.status(404).json({message: 'element not found!'});
    }
    res.status(200).json({ element });
  } catch (error) {
    console.error('Error fetching storage:', error);
    res.status(500).json({ error: 'Unable to fetch storage!' });
  }  
}

const addElement = async (req, res) => {
  try {
    const { group, username, userId, title, quantity, unit } = req.body;
    await Storage.create({
      group, 
      username, 
      userId, 
      title, 
      quantity, 
      unit,
    });
    res.status(201).json({ message: "element is added!" });
  } catch (error) {
    console.error('Error adding element:', error);
    res.status(500).json({ error: 'Unable to add element!' });
  }
}

const updateElement = async(req, res) => {
  try {
    const { group, username, userId, title, quantity, unit } = req.body;
    const element = await Storage.findOne({ where: {id: req.params.elementId }});
    if(!element) {
      return res.status(404).json({message: 'element not found!'});
    }
    await element.update({
      group, 
      username, 
      userId, 
      title, 
      quantity, 
      unit,
    });
    res.status(201).json({ message: "element is updated!" });
  } catch (error) {
    console.error('Error updating element:', error);
    res.status(500).json({ error: 'Unable to update element!' });
  }
}

const deleteElement = async(req, res) => {
  try {
    await Storage.destroy({
      where: {
          id: req.params.elementId
      }
    });
    res.status(202).json({ message: 'Element is deleted!'});
  } catch (err) {
    console.error('Error deleting element:', error);
    res.status(500).json({ error: 'Unable to delete element!' });
  }
}

module.exports = {
  getStorage,
  getElementById,
  addElement,
  updateElement,
  deleteElement,
}