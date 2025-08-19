const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require('../utils/validators');
const { findUserByEmail, createUser } = require('../queries/authQueries');
const { Success, Error } = require('../utils/responseMessages');

exports.register = async (req, res) => {
  try {
    const { error } = registerValidator.validate(req.body);
    if (error) return res.status(Error.VALIDATION_ERROR.statusCode).json({ ...Error.VALIDATION_ERROR, details: error.details });
    const { name, email, password } = req.body;
    const existing = await findUserByEmail(email);
    if (existing) return res.status(Error.USER_REGISTRATION_FAIL.statusCode).json({ ...Error.USER_REGISTRATION_FAIL, customMessage: 'Email already registered.' });
    const hashed = await bcrypt.hash(password, 10);
    const userId = await createUser(name, email, hashed);
    return res.status(Success.USER_REGISTERED.statusCode).json({ ...Success.USER_REGISTERED, data: { id: userId, name, email } });
  } catch (e) {
    return res.status(Error.DEFAULT.statusCode).json(Error.DEFAULT);
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginValidator.validate(req.body);
    if (error) return res.status(Error.VALIDATION_ERROR.statusCode).json({ ...Error.VALIDATION_ERROR, details: error.details });
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(Error.USER_LOGIN_FAIL.statusCode).json(Error.USER_LOGIN_FAIL);
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(Error.USER_LOGIN_FAIL.statusCode).json(Error.USER_LOGIN_FAIL);
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(Success.USER_LOGGED_IN.statusCode).json({ ...Success.USER_LOGGED_IN, token });
  } catch (e) {
    return res.status(Error.DEFAULT.statusCode).json(Error.DEFAULT);
  }
};

exports.logout = async (req, res) => {
  return res.status(Success.USER_LOGGED_OUT.statusCode).json(Success.USER_LOGGED_OUT);
};
