// Implement email sending logic using any free service or nodemailer (for demonstration purpose, a placeholder function is used)
const sendEmail = async (email, subject, message) => {
  console.log(`Sending Email to ${email}: ${subject} - ${message}`);
  return { success: true };
};

module.exports = {
  sendEmail
};
