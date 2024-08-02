import { Product } from '../model/seller';

class ProductService {
  public async getProductById(productId: string) {
    return await Product.findOne({ productId });
  }
}

export default new ProductService();
