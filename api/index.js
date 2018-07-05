const express = require('express');
let api = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('passport');
const user = require('./user');
const admin = require('./admin');
const product = require('./product');
const Cart = require('../model/cart');
const {
  successMessage,
  failedMessage
} = require('../utils/message');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then(user => {
    if (!user) res.json(failedMessage('Could not find the user 2'));

    req.user = user;
    req.token = token;
    next();

  }).catch(() => res.status(401).json(failedMessage("something wrong")));

};

// ROUTE -- /user/*
api.use('/user', authenticate, user);


// ROUTE -- /admin/*
api.use('/admin', authenticate, function(req, res, next) {
  if (req.user.role === 'Admin') {
    next();
  } else {
    res.status(401).json(failedMessage('Unauthorized User. You are not authorized for this action.'))
  }
}, admin);

// ROUTE -- /product/*
api.use('/products', product);

api.post('/register', function(req, res, next) {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    res.json({
      success: false,
      message: 'Please enter an email and password to register'
    });
  } else {
    const newUser = new User({
      email,
      password,
      role: 'Admin'
    });

    newUser.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          message: 'This email already exists. Please use another one.'
        });
      } else {

        if (newUser.role === 'Customer') {
          const cart = new Cart();
          cart.owner = newUser._id;

          cart.save(error => {
            if (error) next(error);
            res.json({
              success: true,
              message: 'Successfully created new user'
            });
          })
        }
      }
    });
  }
});

// Authenticate the user
api.post('/login', function(req, res) {
  const {
    email,
    password
  } = req.body;
  User.findOne({
    email
  }, function(err, user) {
    console.log(user);
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: 'Could not find the user login'
      });
    } else {
      user.comparePassword(password, function(err, isMatch) {
        if (isMatch && !err) {
          user.generateToken().then(token => {
            res.json({
              success: true,
              token
            });
          });

        } else {
          res.json({
            success: false,
            message: 'Authentication failed, Password did not match'
          });
        }
      });
    }
  });
});

api.get('/logout', function(req, res) {
  req.logout();
  res.json({
    success: true,
    message: 'Successfully logged out'
  });
});

module.exports = api;