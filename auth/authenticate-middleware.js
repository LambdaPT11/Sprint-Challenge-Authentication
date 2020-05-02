const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'keep it secret'

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (suthorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ msg: 'invalid token' })
      }else{
        req.token = decodedToken;
        next();
      }
    })
  }else{
  res.status(401).json({ you: 'shall not pass!' });
  }
};
