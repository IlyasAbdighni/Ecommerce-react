const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('../config/main');
const _ = require('lodash');

const { successMessage, failedMessage } = require('../utils/message');

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		min: 4
	},
	password: {
		type: String,
		min: 6,
		required: true
	},
	role: {
		type: String,
		enum: ['Admin', 'Customer'],
		default: 'Customer'
	},
	'purchase-history': [
		{
			date: String,
			paid: {
				type: Number,
				defalut: 0
			},
			item: {
				type: Schema.Types.ObjectId,
				ref: 'Product'
			}
		}
	],
	tokens: [
		{
			type: String
		}
	]
});

UserSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email', 'role', 'purchase-history']);
};

// Save the user's hashed password
UserSchema.pre('save', function(next) {
	var user = this;

	if (user.isModified('password') || user.isNew) {
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				return next(err);
			}

			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					return next(err);
				}
				user.password = hash;
				next();
			});
		});
	} else {
		return next();
	}
});

UserSchema.methods.generateToken = async function() {
	const user = this;
	const token = jwt
		.sign(
			{
				id: user._id.toHexString()
			},
			config.secret,
			{
				expiresIn: 1000 * 60 * 60 * 6 // expires in 6 hours
			}
		)
		.toString();
	user.tokens = user.tokens.concat([token]);

	await user.save();

	return token;
};

UserSchema.statics.findByToken = async function(token) {
	const User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, config.secret);
	} catch (e) {
		return Promise.reject('Could find the user 1');
	}

	const user = await User.findById(decoded.id);
	return user;
};

// Create method to compare password
UserSchema.methods.comparePassword = function(pw, cb) {
	bcrypt.compare(pw, this.password, function(err, isMatch) {
		if (err) {
			return cb(err);
		}
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', UserSchema);
