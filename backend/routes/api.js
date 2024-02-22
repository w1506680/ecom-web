const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Define routes for product api
const { getAllProducts, getProductById } = require('../controllers/productController');
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);


// Define routes for user authentication
const {
    registerUser,
    loginUser,
    verifyOTP,
    changePassword,
    forgotPassword,
    resetPassword
} = require('../controllers/authController');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/auth/verify-otp', verifyOTP);
router.post('/auth/change-password', auth, changePassword)
router.post('/auth/forgot-password', forgotPassword) 
router.post('/auth/reset-password', resetPassword) 

// Define routes for checkout & payment transactions
const { checkout, payment } = require('../controllers/paymentController');
router.post('/transactions/checkout', checkout);
router.post('/transactions/payment', payment);

module.exports = router;
