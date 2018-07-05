const express = require('express');
let admin = express.Router();
const User = require('../model/user');

admin.get('/', (req, res) => res.send('admin'));

module.exports = admin;
