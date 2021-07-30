const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config/config');

// home page
router.get('/', (req, res) => {
  if (req.isLoggedIn) {
    res.redirect('/form');
  } else {
    res.render('login');
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRes = await User.findOne({ email });
    if (userRes) {
      const isMatched = await bcrypt.compare(password, userRes.password);
      if (isMatched) {
        const token = jwt.sign({ _id: userRes._id.toString() }, jwtToken);
        res.cookie('jwt-token', token);
        res.status(200).json({ isLoggedIn: true, user: userRes });
      } else {
        console.log('password error');
        res.send({ error: 'password error' });
      }
    } else {
      res.send({ error: "user doesn't exist" });
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ error });
  }
});

module.exports = router;
