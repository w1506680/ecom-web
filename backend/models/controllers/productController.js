const productsData = require('../data/products.json');

// Get all products
const getAllProducts = (req, res) => {
    res.json(productsData.map(product => {
        // Return only necessary properties for each product
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description
        };
    }));
};

// Get product by ID
const getProductById = (req, res) => {
    const productId = req.params.id;
    const product = productsData.find(product => product.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

module.exports = {
    getAllProducts,
    getProductById
};
