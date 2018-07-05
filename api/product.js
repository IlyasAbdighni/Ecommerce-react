const express = require('express');
let admin = express.Router();
const Product = require('../model/product');

admin.get('/', (req, res) => res.send('product'));

module.exports = admin;
