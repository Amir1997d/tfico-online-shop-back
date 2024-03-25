const { Machine } = require('../models/machineModel');
const { Product } = require('../models/productModel');

const getAllMachines = async (req, res) => {
    try {
      const machines = await Machine.findAll({
        include: {
          model: Product,
          attributes: ['title', 'industry', 'price', 'description', 'images'],
        },
      });
      res.status(200).json(machines);
    } catch (error) {
      console.error('Error fetching machines:', error);
      res.status(500).json({ error: 'Unable to fetch machines' });
    }
}

const addMachine = async (req, res) => {
    try{
        const { 
            title, 
            industry, 
            price, 
            description, 
            images, 
            type,
            warranty,
            cnc,
            machineSize
        } = req.body;

        const product = await Product.create({
            title,
            industry,
            price,
            description,
            images
        });

        const machine = await Machine.create({
            machineType: type,
            warranty,
            cnc,
            size: machineSize
        });

        await machine.setProduct(product);
        res.status(200).json({ message: "machine is added!" });

    } catch(error) {
        console.error('Error adding machine:', error);
        res.status(500).json({ error: 'Unable to add machine' });
    }
}

module.exports = {
    getAllMachines,
    addMachine,
}