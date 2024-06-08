// routes/productRoutes.js
const express = require('express');
const productController = require('./controllers/ProductController');

const router = express.Router();

router.get('/companies/:companyname/categories/:categoryname/products', productController.getProductsByCategory.bind(productController));
router.get('/companies/:companyname/categories/:categoryname/products/:productid', productController.getProductById.bind(productController));

module.exports = router;
