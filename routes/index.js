const router = require('express').Router();
const User = require('../model/User');
const Contact = require('../model/Contact');

// home page
router.get('/', async (req, res) => {
  if (req.isLoggedIn) {
    const user = await User.findById(req.userInfo._id);
    res.render('portfolio', { user });
  } else {
    res.redirect('/login');
  }
});

router.get('/form', async (req, res) => {
  if (req.isLoggedIn) {
    const user = await User.findById(req.userInfo._id);
    res.render('portfolio-form', { user });
  } else {
    res.redirect('/login');
  }
});

router.post('/contact', async (req, res) => {
  try {
    const msg = new Contact({ ...req.body });
    const sentMsg = await msg.save();
    res.status(200).json({ sentMsg });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt-token');
  res.redirect('/login');
});

module.exports = router;
