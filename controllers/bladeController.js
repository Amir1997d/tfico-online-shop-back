const { Blade } = require('../models/bladeModel');
const { Product } = require('../models/productModel');

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
            IdealFor, 
            HardnessRanges
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
            IdealFor, 
            HardnessRanges
        });

        await blade.setProduct(product);
        
        res.status(200).json({ message: "blade is added!" });
    } catch(error) {
        console.error('Error adding blade:', error);
        res.status(500).json({ error: 'Unable to add blade' });
    }
}

module.exports = {
    getAllBlades,
    addBlade,
}
