
const nodemailer = require("nodemailer")

async function sendResetPasswordUrl(email, resetUrl) {

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
      to: email,
      subject: 'Reset Password',
      text: `Reset your password by clicking here: \n\n ${resetUrl}`
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
    sendResetPasswordUrl
  }