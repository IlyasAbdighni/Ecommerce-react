const express = require('express');
let admin = express.Router();
const User = require('../model/user');
const Category = require('../model/category');
const Product = require('../model/product');
const {
  successMessage,
  failedMessage
} = require('../utils/message');

admin.post('/category/add', (req, res, next) => {
  const categoryName = req.body.categoryName;

  if (!categoryName) {
    res.json(failedMessage('Please provide a for the category!'));
  } else {
    const category = new Category();
    category.name = categoryName;

    category.save(error => {
      if (error) res.json(failedMessage(`Category name has to be unique, ${category.name} is already in the data base`));
      res.send(successMessage(`A new category "${category.name}" created`))
    })
  }

  admin.get('/categories', (req, res, next) => {

    Category.find()

  })


})

admin.post('/product/add', (req, res, next) => {
  const {
    name,
    price,
    categoryId,
    quantity
  } = _.pick(req.body, [
    "name",
    "price",
    "quantity",
    "categoryId"
  ]);

  const product = new Product();

  product.name = name;
  product.price = price;
  product.categoryId = categoryId;
  product.quantity = quantity;


  product.save((error, newProduct) => {
    if (error) next(error);
    res.json(successMessage('Product created.'));
  })

})

module.exports = admin;