const router = require('express').Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
  if (req.isLoggedIn) {
    const user = await User.findById(req.userInfo._id);
    res.render('portfolio-form', { user });
  } else {
    res.redirect('/login');
  }
});

router.patch('/', async (req, res) => {
  try {
    const data = {
      ...req.body.info,
      qualification: {
        inter: {
          year: req.body.qual.iYear,
          college: req.body.qual.iClg,
          branch: req.body.qual.iBranch,
        },
        grad: {
          year: req.body.qual.gYear,
          college: req.body.qual.gClg,
          branch: req.body.qual.gBranch,
        },
        master: {
          year: req.body.qual.mYear,
          college: req.body.qual.mClg,
          branch: req.body.qual.mBranch,
        },
      },
      skills: {
        ...req.body.skills,
      },
      projects: {
        project1: {
          title: req.body.projects.proj1_title,
          link: req.body.projects.proj1_link,
        },
        project2: {
          title: req.body.projects.proj2_title,
          link: req.body.projects.proj2_link,
        },
        project3: {
          title: req.body.projects.proj3_title,
          link: req.body.projects.proj3_link,
        },
      },
    };
    const user = await User.findByIdAndUpdate(req.userInfo._id, data, {
      new: true,
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
