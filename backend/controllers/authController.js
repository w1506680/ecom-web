// authController.js
const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const { signToken } = require('../utils/token');
const { generateOTP, sendOTP } = require('../utils/otp');
const { sendResetPasswordUrl } = require('../utils/email');
const { hashPassword, comparePassword } = require('../utils/password');
const auth = require('../middleware/auth');

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
}

// Controller function for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate username/password
    const user = await User.findOne({email});
    if(!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({message: 'Invalid credentials'});
    }
  
    // Generate and send OTP
    const generatedOtp = generateOTP();
    await sendOTP(user.email, generatedOtp);

    // Add expiration 
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Save OTP document
    const otpDoc = new OTP({
        email: email,
        otp: generatedOtp,
        expiresAt: expiresAt
    });

    await otpDoc.save();
    
    res.json({message: 'OTP sent'});
  
}


// Controller function for verifying OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    
    // Verify OTP
    const user = await User.findOne({email}); 

    if(!user) {
        // User not found
        return res.status(400).send('User not found');
    }

    // OTP verification logic...
    const otpDoc = await OTP.findOne({email:email, otp:otp});

    if(!otpDoc || otpDoc.expiresAt < Date.now()) {
        // OTP expired
        return res.status(400).send('OTP expired'); 
    }

    

    if(otpDoc.otp !== otp) {
        // Invalid OTP
        return res.status(400).send('Invalid OTP');
    } 
    
    // OTP Verified

    // Generate JWT
    const token = signToken(user);

    // Revoke OTP
    await otpDoc.deleteOne();

    res.json({token});
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
    
        const user = await User.findById(req.user._id);
    
        const isMatch = await comparePassword(oldPassword, user.password);
    
        if(!isMatch) {
            return res.status(400).json({ msg: 'Incorrect old password'});
        }

        // Hash the password
        const hashedPassword = await hashPassword(newPassword);
    
        user.password = hashedPassword;
        await user.save();
        
        res.json({ msg: 'Password changed successfully'});
    } catch (error) {
        return res.status(400).json({ msg: 'Incorrect old password'});
    }
  
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
  
    if(!user) {
      return res.status(404).json({ msg: 'User not found with this email'});
    }
  
    // Generate and save reset token  
    const resetToken = generateOTP();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 60);

    // Save OTP document
    const otpDoc = new OTP({
        email: email,
        otp: resetToken,
        expiresAt: expiresAt
    });

    await otpDoc.save();
  
    // Send email
    const resetUrl = `${req.protocol}://localhost:8000/reset-password/${resetToken}`;
    await sendResetPasswordUrl(user.email, resetUrl);
  
    res.json({ msg: 'Reset password email has been sent'});
}

const resetPassword = async (req, res) => {
    const { password, token } = req.body;


    // OTP verification logic...
    const otpDoc = await OTP.findOne({otp: token});

    // Invalid or expirted
    if(!otpDoc || otpDoc.otp !== token || otpDoc.expiresAt < Date.now()) {
        // Invalid OTP
        return res.status(400).json({ msg: 'Invalid or expired token'});
    } 

    const user = await User.findOne({email: otpDoc.email});
  
    if(!user) {
      return res.status(404).json({ msg: 'User not found with this email'});
    }

     // Hash the password
     const hashedPassword = await hashPassword(password);
    
    
    user.password = hashedPassword;
    await user.save();
  
    await otpDoc.deleteOne();
  
    res.json({ msg: 'Password updated successfully'});
}

module.exports = {
    registerUser,
    loginUser,
    verifyOTP,
    changePassword,
    forgotPassword,
    resetPassword
};
