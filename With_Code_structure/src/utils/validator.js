const Joi = require('joi');
const { ErrorMessages } = require('./responseMessages');

const validateReminder = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    type: Joi.string().required()
  });
  
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(ErrorMessages.INVALID_REMINDER_TYPE.statusCode)
      .json(ErrorMessages.INVALID_REMINDER_TYPE);
  }
  next();
};

module.exports = {
  validateReminder
};
