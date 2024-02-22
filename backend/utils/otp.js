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

  // Create a transporter using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'example@gmail.com',
        pass: 'xxyecucwejgpfynh' // Gmail App Password
    }
  });

  // Define email options
  let mailOptions = {
    from: 'example@gmail.com',
    to: username,
    subject: 'OTP for login',
    text: `Your one time password is: ${otp}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Message sent successfully!');
    console.log('Message ID:', info.messageId);
  });

}


module.exports ={
  generateOTP,
  sendOTP
}