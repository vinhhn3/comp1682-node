const Product = require("../models/product");

class ProductRepository {
  async createProduct(data) {
    return await Product.create(data);
  }

  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductRepository();
