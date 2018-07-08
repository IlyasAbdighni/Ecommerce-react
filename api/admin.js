const express = require('express');
let admin = express.Router();
const User = require('../model/user');
const Category = require('../model/category');
const Product = require('../model/product');
const _ = require('lodash');
const { successMessage, failedMessage } = require('../utils/message');

/*

  Category

*/

admin.post('/category/add', (req, res, next) => {
	const categoryName = req.body.categoryName;

	if (!categoryName) {
		res.json(failedMessage('Please provide a for the category!'));
	} else {
		const category = new Category();
		category.name = categoryName;

		category.save(error => {
			if (error)
				res.json(
					failedMessage(
						`Category name has to be unique, ${
							category.name
						} is already in the data base`
					)
				);
			res.send(successMessage(`A new category "${category.name}" created`));
		});
	}

	admin.get('/categories', (req, res, next) => {
		Category.find();
	});
});

/*

  Product

*/
admin.post('/product/add', (req, res, next) => {
	const { name, price, quantity } = _.pick(req.body, [
		'name',
		'price',
		'quantity'
	]);

	const product = new Product();

	product.name = name;
	product.price = price;
	product.quantity = quantity;

	product.save((error, newProduct) => {
		if (error) next(error);
		res.json(successMessage('Product created.'));
	});
});

admin.post('/product/:id/edit', (req, res, next) => {
	const id = req.params.id;

	const product = _.pick(req.body, ['name', 'price', 'quantity', 'categoryId']);

	Product.findByIdAndUpdate(id, {
		$set: product
	})
		.then(product => res.json(product))
		.catch(e => res.json(failedMessage('Could not update the product detail')));
});

admin.get('/users', (req, res) => {
	User.find()
		.then(users => res.json({ success: true, users }))
		.catch(e => res.json({ success: false, error: 'could not find users' }));
});

module.exports = admin;
