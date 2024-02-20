const express = require('express');
const router = express.Router();

// Define routes for product api
const { getAllProducts, getProductById } = require('../controllers/productController');

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);


// Define routes for user authentication
const {
    registerUser,
    loginUser,
    logoutUser,
    generateOTP,
    verifyOTP
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/generate-otp', generateOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;
