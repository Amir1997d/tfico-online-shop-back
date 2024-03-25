const { Machine } = require('../models/machineModel');
const { Product } = require('../models/productModel');

const getAllMachines = async (req, res) => {
    try {
      const machines = await Machine.findAll({
        include: [Product]
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

const deleteMachine = async (req, res) => {
  try {
    const machine = await Machine.findOne({
      where: {
        id: req.params.id
      }
    });

    if(!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }

    await Machine.destroy({
      where: {
        id: req.params.id
      }
    });

    await Product.destroy({
      where: {
        id: machine.productId
      }
    });

    res.status(202).json({ message: "Machine is deleted!" });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).json({ error: 'Unable to delete machine' });
  }
}

module.exports = {
    getAllMachines,
    addMachine,
    deleteMachine
}