const axios = require('axios');
require('dotenv').config();

const sendSMS = async (phoneNumber, message) => {
  const response = await axios.post(process.env.SMS_API_URL, {
    phone: phoneNumber,
    message: message,
    key: process.env.SMS_API_KEY
  });
  return response.data;
};

module.exports = {
  sendSMS
};
