const axios = require('axios');
require('dotenv').config();

const sendWhatsAppMessage = async (phoneNumber, message) => {
  const response = await axios.post(process.env.WHATSAPP_API_URL, {
    phone: phoneNumber,
    text: message,
    api_key: process.env.WHATSAPP_API_KEY
  });
  return response.data;
};

module.exports = {
  sendWhatsAppMessage
};
