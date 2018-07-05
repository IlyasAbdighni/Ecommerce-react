const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	name: String,
	price: Number,
	image: String,
	inventory: { type: Number, default: Math.floor(Math.random() * 16) + 5 },
	emailList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	createdAt: { type: Date, default: Date.now }
});

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

ProductSchema.statics.search = function(productName, cb) {
	const regex = new RegExp(escapeRegex(productName), "gi");
	return this.find({ name: regex }, cb);
};

module.exports = mongoose.model("Product", ProductSchema);
