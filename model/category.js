const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

CategorySchema.pre('save', function(next) {
  const category = this;
  category.name = category.name.charAt(0).toUpperCase() + category.name.slice(1).toLowerCase();
  next();
});

module.exports = mongoose.model("Category", CategorySchema);