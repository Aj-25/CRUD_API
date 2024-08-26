const axios = require('axios');
const nodemailer = require('nodemailer');
const { REMINDER_TYPES } = require('./constant');

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  let info = await transporter.sendMail({
    from: `"Reminder Service" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });

  return info;
};

const sendSMS = async (to, message) => {
  const response = await axios.post('https://sms-api.example.com/send', {
    apiKey: process.env.SMS_API_KEY,
    to,
    message
  });
  return response.data;
};

const sendWhatsApp = async (to, message) => {
  const response = await axios.post('https://whatsapp-api.example.com/send', {
    apiKey: process.env.WHATSAPP_API_KEY,
    to,
    message
  });
  return response.data;
};

const sendReminder = async (user, type, message) => {
  let response;
  switch (type) {
    case REMINDER_TYPES.EMAIL:
      response = await sendEmail(user.email, 'Reminder', message);
      break;
    case REMINDER_TYPES.SMS:
      response = await sendSMS(user.phoneNumber, message);
      break;
    case REMINDER_TYPES.WHATSAPP:
      response = await sendWhatsApp(user.phoneNumber, message);
      break;
    default:
      throw new Error('Invalid reminder type');
  }
  return response;
};

module.exports = {
  sendReminder
};
