const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  mobile: String,
  dob: String,
  age: String,
  domain: String,
  address: String,
  bio: String,
  qualification: {
    inter: {
      year: String,
      college: String,
      branch: String,
    },
    grad: {
      year: String,
      college: String,
      branch: String,
    },
    master: {
      year: String,
      college: String,
      branch: String,
    },
  },
  skills: {
    programming: String,
    frameworks: String,
    other: String,
  },
  projects: {
    project1: {
      title: String,
      link: String,
    },
    project2: {
      title: String,
      link: String,
    },
    project3: {
      title: String,
      link: String,
    },
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('user', userSchema);
