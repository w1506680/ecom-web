const express = require('express');
const router = express.Router();
const productsData = require('../data/products.json');

// GET all products
router.get('/products', (req, res) => {
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
});

// GET product by ID
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = productsData.find(product => product.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;
