const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

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
			paid: { type: Number, defalut: 0 },
			item: { type: Schema.Types.ObjectId, ref: 'Product' }
		}
	]
});

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
