const ErrorMessages = {
  DEFAULT: {
    statusCode: 501,
    customMessage: 'Something went wrong.',
    type: 'DEFAULT'
  },
  INSUFFICIENT_CREDITS: {
    statusCode: 400,
    customMessage: 'Insufficient credits to send a reminder.',
    type: 'INSUFFICIENT_CREDITS'
  },
  INVALID_REMINDER_TYPE: {
    statusCode: 400,
    customMessage: 'Invalid reminder type.',
    type: 'INVALID_REMINDER_TYPE'
  },
  USER_NOT_FOUND: {
    statusCode: 404,
    customMessage: 'User not found.',
    type: 'USER_NOT_FOUND'
  }
};

const SuccessMessages = {
  REMINDER_SENT: {
    statusCode: 200,
    customMessage: 'Reminder sent successfully.',
    type: 'REMINDER_SENT'
  },
  CREDITS_RETRIEVED: {
    statusCode: 200,
    customMessage: 'Remaining credits retrieved successfully.',
    type: 'CREDITS_RETRIEVED'
  }
};

module.exports = { ErrorMessages, SuccessMessages };
