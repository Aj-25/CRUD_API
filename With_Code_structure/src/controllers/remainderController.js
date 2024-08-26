const { sendReminder } = require('../utils/notificationServices');
const userService = require('../services/remainderServices');
const { ErrorMessages, SuccessMessages } = require('../utils/responseMessages');
const { REMINDER_TYPES } = require('../utils/constant');

const sendReminderHandler = async (req, res) => {
  try {
    const { userId, type } = req.body;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(ErrorMessages.USER_NOT_FOUND.statusCode)
        .json(ErrorMessages.USER_NOT_FOUND);
    }

    // const message = `This is your ${type} reminder.`;
    // await sendReminder(user, REMINDER_TYPES[type.toUpperCase()], message);

    await userService.deductCredits(userId,type.toUpperCase());

    return res.status(SuccessMessages.REMINDER_SENT.statusCode)
      .json(SuccessMessages.REMINDER_SENT);
  } catch (err) {
    return res.status(ErrorMessages.DEFAULT.statusCode)
      .json({ ...ErrorMessages.DEFAULT, customMessage: err.message });
  }
};

const getRemainingCredits = async (req, res) => {
  try {
    const { userId } = req.params;
    const credits = await userService.getRemainingCredits(userId);

    if (credits === null) {
      return res.status(ErrorMessages.USER_NOT_FOUND.statusCode)
        .json(ErrorMessages.USER_NOT_FOUND);
    }

    return res.status(SuccessMessages.CREDITS_RETRIEVED.statusCode)
      .json({ ...SuccessMessages.CREDITS_RETRIEVED, credits });
  } catch (err) {
    return res.status(ErrorMessages.DEFAULT.statusCode)
      .json({ ...ErrorMessages.DEFAULT, customMessage: err.message });
  }
};

module.exports = {
  sendReminder: sendReminderHandler,
  getRemainingCredits
};
