
const express = require('express');
const router = express.Router();
const ProductController = require('./controllers/ProductController');

router.get('/categories/:categoryname/products', ProductController.getProductsByCategory.bind(ProductController));
router.get('/categories/:categoryname/products/:productid', ProductController.getProductById.bind(ProductController));

module.exports = router;
