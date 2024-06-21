const ProductService = require("../services/ProductService");

class ProductController {
	async getProductsByCategory(req, res) {
		try {
			const { categoryname } = req.params;
			const {
				top = 10,
				minPrice,
				maxPrice,
				page = 1,
				sort = "price",
				order = "asc",
				maxRating,
				minRating,
			} = req.query;

			const products =
				await ProductService.getProductsByCategory(
					{
						categoryname,
						top,
						minPrice,
						maxPrice,
						page,
						sort,
						order,
						maxRating,
						minRating,
					}
				);

			res.json(products);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getProductById(req, res) {
		try {
			const { categoryname, productid } = req.params;
			const product =
				await ProductService.getProductById(
					categoryname,
					productid
				);

			if (product) {
				res.json(product);
			} else {
				res.status(404).send(
					"Product not found"
				);
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new ProductController();
