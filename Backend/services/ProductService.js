
const fs = require('fs');

class ProductService {
  constructor() {
    this.dataPath = './sampleMerchantStores.json';
  }

  loadData() {
    const jsonData = fs.readFileSync(this.dataPath);
    return JSON.parse(jsonData);
  }

  generateUniqueId(product) {
    return `${product.productName}-${product.price}-${product.rating}`;
  }

  assignUniqueIds(data) {
    data.stores.forEach(store => {
      store.products = store.products.map(product => {
        product.id = this.generateUniqueId(product);
        return product;
      });
    });
    return data;
  }

  applySorting(products, sort, order) {
    return products.sort((a, b) => {
      if (order === 'asc') {
        return a[sort] > b[sort] ? 1 : -1;
      } else {
        return a[sort] < b[sort] ? 1 : -1;
      }
    });
  }

  getProductsByCategory({ categoryname, top, minPrice, maxPrice, page, sort, order,minRating,maxRating }) {
    let data = this.loadData();
    
 
    data = this.assignUniqueIds(data);

    let products = [];

     
    data.stores.forEach(store => {
      products = products.concat(store.products);
    });

  
    if (minPrice) {
       products = products.filter(product => product.price >= minPrice);
    }
     if (maxPrice) {
      products = products.filter(product => product.price <= maxPrice);
    }
    if (minRating) {
      products = products.filter(product => product.rating >= minRating);
    }
    if (maxRating) {
      products = products.filter(product => product.rating <= maxRating);
    }

    // Apply sorting
    const validSortFields = ['price', 'rating', 'discount'];
    if (validSortFields.includes(sort)) {
      products = this.applySorting(products, sort, order);
    } else {
      // Default sorting by price if the sort field is invalid
      products = this.applySorting(products, 'price', 'asc');
    }

  
    const pageSize = parseInt(top, 5);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return products.slice(startIndex, endIndex);
  }

  getProductById(categoryname, productid) {
    let data = this.loadData();
    
    
    data = this.assignUniqueIds(data);

    let product;

  
    data.stores.forEach(store => {
      const foundProduct = store.products.find(prod => prod.id === productid);
      if (foundProduct) {
        product = foundProduct;
      }
    });

    return product;
  }
}

module.exports = new ProductService();
