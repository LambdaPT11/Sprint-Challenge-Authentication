const jwt = require('jsonwebtoken');
// 

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const secret = process.env.JWT_SECRET || 'keep it secret'

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ msg: 'invalid token' })
      }else{
        req.decodedToken = decodedToken;
        next();
      }
    });
  }else{
  res.status(400).json({ you: 'shall not pass!' });
  }
};
