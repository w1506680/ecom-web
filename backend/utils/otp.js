// utils/otp.js
const nodemailer = require("nodemailer");

function generateOTP() {
  // Logic to generate 6 digit OTP
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  console.log(otp);
  return otp; 
}

async function sendOTP(username, otp) {

  // Create a transporter using SMTP configuration
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, 
    auth: {
      user: 'test@example.com',
      pass: 'password'
    }
  });

  // Define email options
  let mailOptions = {
    from: 'test@example.com',
    to: username, 
    subject: 'OTP for login',
    text: `Your one time password is: ${otp}`
  };

  // Send email
  let info = await transporter.sendMail(mailOptions);

  console.log('OTP sent successfully!');
}


module.exports ={
  generateOTP,
  sendOTP
}