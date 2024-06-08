// controllers/ProductController.js
const ProductService = require('../services/ProductService');

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async getProductsByCategory(req, res) {
    try {
      const { categoryname, companyname } = req.params;
      const { top, page = 1, sortBy = 'price', sortOrder = 'asc', minPrice = 0, maxPrice = Infinity } = req.query;

      const products = await this.productService.getProductsByCategory(
        categoryname,
        companyname,
        parseInt(top, 10),
        parseInt(page, 10),
        sortBy,
        sortOrder === 'asc' ? 1 : -1,
        parseFloat(minPrice),
        parseFloat(maxPrice)
      );

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const { categoryname, productid } = req.params;

      const product = await this.productService.getProductById(productid);

      if (!product || product.category !== categoryname) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductController();
