// services/ProductService.js
const Product = require('../models/ProductModel');

class ProductService {
  constructor() {
    this.cache = new Map();
  }

  generateCacheKey(category, company, limit, page, sortBy, sortOrder, minPrice, maxPrice) {
    return `${category}-${company}-${limit}-${page}-${sortBy}-${sortOrder}-${minPrice}-${maxPrice}`;
  }

  async getProductsByCategory(category, company, limit, page, sortBy, sortOrder, minPrice, maxPrice) {
    const cacheKey = this.generateCacheKey(category, company, limit, page, sortBy, sortOrder, minPrice, maxPrice);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const sortCriteria = {};
    sortCriteria[sortBy] = sortOrder;

    const filterCriteria = {
      category,
      company,
      price: { $gte: minPrice, $lte: maxPrice }
    };

    const products = await Product.find(filterCriteria)
      .sort(sortCriteria)
      .limit(limit)
      .skip(limit * (page - 1));

    this.cache.set(cacheKey, products);
    return products;
  }

  async getProductById(id) {
    return await Product.findOne({ id });
  }
}

module.exports = ProductService;
