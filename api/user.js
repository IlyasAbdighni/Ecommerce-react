const express = require('express');
let user = express.Router();
const User = require('../model/user');

user.get('/', (req, res) => res.send('user'));

module.exports = user;
