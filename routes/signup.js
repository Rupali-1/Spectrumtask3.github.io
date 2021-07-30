const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config/config');
const User = require('../model/User');

// home page
router.get('/', (req, res) => {
  if (req.isLoggedIn) {
    res.redirect('/form');
  } else {
    res.render('registration');
  }
});

router.post('/', async (req, res) => {
  try {
    const registerUser = new User({
      ...req.body,
    });
    const registeredUser = await registerUser.save();
    const token = jwt.sign({ _id: registeredUser._id.toString() }, jwtToken);
    res.cookie('jwt-token', token);
    res.status(200).json({ isLoggedIn: true, user: registeredUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
