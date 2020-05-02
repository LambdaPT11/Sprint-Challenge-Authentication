const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 6);
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ msg: `${user.username} logged in`, token });
      }else{
        res.status(401).json({ msg: 'invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

const secret = process.env.JWT_SECRET || 'Keep it secret'

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1m'
  };
  return jwt.sign(payload, secret, options)
}

module.exports = router;
