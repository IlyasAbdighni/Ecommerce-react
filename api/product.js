const express = require('express');
let product = express.Router();
const Product = require('../model/product');

function paginate(req, res, next) {
	const perPage = 9;
	const { page } = req.params;

	Product.find()
		.skip(perPage * (page - 1))
		.limit(perPage)
		.populate('category')
		.exec((error, products) => {
			if (error) return next(error);
			Product.count().exec((err, count) => {
				if (err) return next(err);
				res.json({
					success: true,
					products,
					page: count / perPage,
					currPage: page
				});
			});
		});
}

product.get('/page/:page', (req, res, next) => {
	paginate(req, res, next);
});

/*

  Products All

*/
product.get('/all', (req, res) => {
	Product.find()
		.then(products => res.json({ success: true, products }))
		.catch(e =>
			res.json({
				success: false,
				error: `Could not find any products. Error  ${JSON.stringify(e)}`
			})
		);
});

product.get('/home', (req, res) => {
	Product.find()
		.limit(9)
		.then(products => res.json({ success: true, products }))
		.catch(e =>
			res.json({
				success: false,
				error: `Could not find any products. Error  ${JSON.stringify(e)}`
			})
		);
});

/*

  Single Product

*/

product.get('/:id', (req, res, next) => {
	Product.findById(req.params.id, (error, product) => {
		if (error) return next(error);
		res.json({ success: true, product });
	});
});

/*

  Searching

*/

product.post('/search', (req, res, next) => {
	console.log(req.body.search);
	const { search } = req.body;
	const notFoundMessage = 'Product not found';
	if (search) {
		Product.search(search, function(err, products) {
			if (err)
				res.json({
					success: false,
					error: err
				});
			res.json({
				success: true,
				products
			});
		});
	} else {
		res.json({
			success: true,
			message: notFoundMessage
		});
	}
});

/*

  Filtering

*/

product.get('/category/:id', (req, res, next) => {
	Product.find({ category: req.params.id })
		.populate('category')
		.exec((error, products) => {
			if (error) return next(error);
			res.json({ success: true, products });
		});
});

module.exports = product;
