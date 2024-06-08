// models/ProductModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  company: { type: String, required: true },
  availability: { type: String, required: true },
  discount: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
