const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};