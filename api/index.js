const express = require('express');
let api = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const passport = require('passport');
const user = require('./user');
const admin = require('./admin');
const product = require('./product');

const requireAuth = () => {
	return passport.authenticate('jwt', {
		session: false
	});
};

api.use('/user', requireAuth(), user);
api.use('/admin', requireAuth(), admin);
api.use('/products', product);

api.post('/register', function(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		res.json({
			success: false,
			message: 'Please enter an email and password to register'
		});
	} else {
		const newUser = new User({
			email,
			password
		});

		newUser.save(function(err) {
			if (err) {
				return res.json({
					success: false,
					message: 'This email already exists. Please use another one.'
				});
			} else {
				res.json({ success: true, message: 'Successfully created new user' });
			}
		});
	}
});

// Authenticate the user
api.post('/login', function(req, res) {
	const { email, password } = req.body;
	User.findOne({ email }, function(err, user) {
		if (err) throw err;
		if (!user) {
			res.json({
				success: false,
				message: 'Could not find the user'
			});
		} else {
			user.comparePassword(password, function(err, isMatch) {
				if (isMatch && !err) {
					const token = jwt.sign(user.toJSON(), config.secret, {
						expiresIn: 1000 * 60 * 24 // expires in one day
					});
					res.json({ success: true, token: 'JWT ' + token });
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
	res.json({ success: true, message: 'Successfully logged out' });
});

module.exports = api;
