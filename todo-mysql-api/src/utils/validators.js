const Joi = require('joi');

exports.registerValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.todoValidator = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('completed','incomplete').default('incomplete')
});
