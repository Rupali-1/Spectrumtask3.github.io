const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const connect = require('./config/database');
// require routes
const indexRoute = require('./routes/index');
const formRoute = require('./routes/form');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const { jwtToken } = require('./config/config');

connect();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.cookies['jwt-token'];
    if (token) {
      const verified = jwt.verify(token, jwtToken);
      if (verified) {
        req.userInfo = verified;
        req.isLoggedIn = true;
      }
    }
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: 'Invalid session!',
    });
  }
  next();
};

// paths
app.use('/', auth, indexRoute);
app.use('/form', auth, formRoute);
app.use('/login', auth, loginRoute);
app.use('/signup', auth, signupRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('server at port ' + port));
