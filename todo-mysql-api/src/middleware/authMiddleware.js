const jwt = require('jsonwebtoken');
const { Error } = require('../utils/responseMessages');

module.exports = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(Error.INVALID_ACCESS_TOKEN.statusCode).json(Error.INVALID_ACCESS_TOKEN);

  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(Error.INVALID_ACCESS_TOKEN.statusCode).json(Error.INVALID_ACCESS_TOKEN);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(Error.INVALID_ACCESS_TOKEN.statusCode).json(Error.INVALID_ACCESS_TOKEN);
  }
};
