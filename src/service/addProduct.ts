import { Product } from '../model/seller';

class ProductService {
  public async createProduct(data: any) {
    const product = new Product(data);
    return await product.save();
  }
}

export default new ProductService();
