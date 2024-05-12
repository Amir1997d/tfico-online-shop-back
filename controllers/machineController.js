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

const getMachineById = async (req, res) => {
  try {
    const machine = await Machine.findOne({where: {id: req.params.machineId}, include:[Product]});
    res.status(200).json(machine);
  } catch (error) {
    console.error('Error fetching machine:', error);
      res.status(500).json({ error: 'Unable to fetch machine' });
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
            machineType,
            warranty,
            cnc,
            size
        } = req.body;

        const product = await Product.create({
            title,
            industry,
            price,
            description,
            images: images
        });

        const machine = await Machine.create({
            machineType,
            warranty,
            cnc,
            size
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

const updateMachine = async (req, res) => {
  const machineId = req.params.id;
  const updatedData = req.body;
  try {
      const machine = await Machine.findOne({ where: { id: machineId }});
      if (!machine) {
          return res.status(404).json({ error: 'Blade not found' });
      }
      
      await machine.update({
        machineType: updatedData.machineType, 
        warranty: updatedData.warranty, 
        cnc: updatedData.cnc, 
        size: updatedData.size, 
      });

      const product = await Product.findOne({ where: { id: machine.productId }});
      if (!product) {
          return res.status(404).json({ error: 'Associated product not found' });
      }
      await product.update({ 
          title: updatedData.title,
          industry: updatedData.industry,
          price: updatedData.price,
          description: updatedData.description,
          images: updatedData.images
      });
  
      res.status(200).json({ message: 'Machine updated successfully' });
  } catch (error) {
      console.error('Error updating machine:', error);
      res.status(500).json({ error: 'Unable to update machine' });
  }
}

module.exports = {
    getAllMachines,
    getMachineById,
    addMachine,
    deleteMachine,
    updateMachine
}