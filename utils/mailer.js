const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It will expire in ${process.env.OTP_EXPIRY_MINUTES || 5} minutes.`
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { transporter, generateOtp, sendOtpEmail };
