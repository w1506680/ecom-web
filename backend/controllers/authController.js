// authController.js
const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const { signToken } = require('../utils/token');
const { hashPassword, comparePassword } = require('../utils/password');

// Controller function for user registration
const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;

         // Validate required fields
         if (!email || !password || !name) {
            return res.status(400).json({ message: 'All fields email, password and name are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }


        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function for user login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    // Validate username/password
    const user = await User.findOne({username});
    if(!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({message: 'Invalid credentials'});
    }
  
    // Generate and send OTP
    const otp = generateOTP();
    await sendOTP(user.username, otp);
  
    // Save OTP in user document
    user.otp = otp;
    await user.save();
  
    res.json({message: 'OTP sent'});
  
};


// Controller function for user logout
const logoutUser = async (req, res) => {
    // Implementation for user logout
};

// Controller function for generating OTP
const generateOTP = async (req, res) => {
    // Implementation for generating OTP
};

// Controller function for verifying OTP
const verifyOTP = async (req, res) => {
    const { username, otp } = req.body;

    const user = await User.findOne({username});

    // Verify OTP
    if(otp !== user.otp) {
        return res.status(400).json({message: 'Invalid OTP'});
    }

    // OTP Verified

    // Generate JWT
    const token = signToken(user);

    // Revoke OTP
    user.otp = null;
    await user.save();

    res.json({token});
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    generateOTP,
    verifyOTP
};
