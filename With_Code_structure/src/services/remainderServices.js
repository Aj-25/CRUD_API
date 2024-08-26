const userDao = require('../dao/userDao');
const {ErrorMessages} = require('../utils/responseMessages');


const getUserById = async (userId) => {
  return await userDao.getUserById(userId);
};

const deductCredits = async (userId, reminderType) => {

  const user = await userDao.getUserById(userId);

  let creditsToDeduct;
  switch (reminderType) {
    case 'EMAIL':
      creditsToDeduct = 1;
      break;
    case 'SMS':
      creditsToDeduct = 2;
      break;
    case 'WHATSAPP':
      creditsToDeduct = 3;
      break;
    default:
      throw new Error('Invalid reminder type');
  }

  if (user.credits < creditsToDeduct) {
    throw new Error(ErrorMessages.INSUFFICIENT_CREDITS.customMessage);
  }

  return await userDao.deductCredits(userId, creditsToDeduct);
};

const getRemainingCredits = async (userId) => {
  return await userDao.getRemainingCredits(userId);
};

module.exports = {
  getUserById,
  deductCredits,
  getRemainingCredits
};
