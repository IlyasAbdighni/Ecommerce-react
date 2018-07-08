const express = require('express');
let user = express.Router();
const User = require('../model/user');
const Cart = require('../model/cart');

user.get('/me', (req, res) => res.json({ isUserAuthenticated: true, user: req.user }));

user.get('/profile', (req, res) => {
  User.findById(req.user._id).then(user => res.json(user));
});

user.get('/cart', (req, res, next) => {
  Cart.findOne({
      owner: req.user._id
    })
    .populate("items.item")
    .exec((error, foundCart) => {
      if (error) next(error);
      res.json({
        success: true,
        cart: foundCart
      });
    });
});

user.post("/cart/:id/remove", (req, res) => {

  Cart.findOne({
    owner: req.user._id
  }, (error, foundCart) => {
    foundCart.items.pull(String(req.body.item));

    foundCart.totoal = foundCart.totoal - parseFloat(req.body.price).toFixed(2);
    foundCart.save().then(user => {
      Cart.find
    })
  });
});

user.post('/cart/add/', (req, res) => {

  const {
    item,
    quantity,
    price
  } = req.body;
  Cart.findOne({
    owner: req.user._id
  }).then(cart => {
    cart.items = cart.items.concat({
      item,
      quantity,
      price
    });

    cart.save().then(newCart => {
      res.json({
        success: true,
        newCart
      })
    }).catch(e => res.json({
      success: false,
      message: 'Could not update the cart'
    }));
  })
})


module.exports = user;
