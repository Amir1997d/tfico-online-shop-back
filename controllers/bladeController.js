const { Blade } = require('../models/bladeModel');
const { Product } = require('../models/productModel');


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch(error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Unable to fetch prooducts' });
    }
}

const getAllBlades = async (req, res) => {
    try {
        const blades = await Blade.findAll({
            include: [Product]
        });

        res.status(200).json(blades);
    } catch (error) {
        console.error('Error fetching blades:', error);
        res.status(500).json({ error: 'Unable to fetch blades' });
    }
}

const addBlade = async (req, res) => {
    try{
        const { 
            title, 
            industry, 
            price, 
            description, 
            images, 
            dementions, 
            material, 
            alloySteelCode, 
            idealFor, 
            hardnessRanges
        } = req.body;

        const product = await Product.create({
            title,
            industry,
            price,
            description,
            images
        });

        const blade = await Blade.create({
            dementions, 
            material, 
            alloySteelCode, 
            idealFor, 
            hardnessRanges
        });

        await blade.setProduct(product);

        res.status(200).json({ message: "blade is added!" });
    } catch(error) {
        console.error('Error adding blade:', error);
        res.status(500).json({ error: 'Unable to add blade' });
    }
}

const deleteBlade = async (req, res) => {
    try {
        const blade = await Blade.findOne({
            where: {
                id: req.params.id
            }
        });

        if(!blade) {
            return res.status(404).json({ error: 'Blade not found' });
        }

        await Blade.destroy({ where: { id: req.params.id }});
        await Product.destroy({
            where: {
              id: blade.productId
            }
          });
        res.status(202).json({ message: "Blade is deleted!" });
    } catch (error) {
        console.error('Error deleting blade:', error);
        res.status(500).json({ error: 'Unable to delete blade' });
    }
}

const updateBlade = async (req, res) => {
    const bladeId = req.params.id;
    const updatedData = req.body;
    try {
        const blade = await Blade.findOne({ where: { id: bladeId }});
        if (!blade) {
            return res.status(404).json({ error: 'Blade not found' });
        }

        await blade.update({
            dementions: updatedData.dementions, 
            material: updatedData.material, 
            alloySteelCode: updatedData.alloySteelCode, 
            idealFor: updatedData.idealFor, 
            hardnessRanges: updatedData.hardnessRanges
        });
  
        const product = await Product.findOne({ where: { id: blade.productId }});
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
    
        res.status(200).json({ message: 'Blade updated successfully' });
    } catch (error) {
        console.error('Error updating blade:', error);
        res.status(500).json({ error: 'Unable to update blade' });
    }
}
module.exports = {
    getAllProducts,
    getAllBlades,
    addBlade,
    deleteBlade,
    updateBlade
}
