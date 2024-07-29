import {Product} from '../model/seller';

class ProductService {
  public async deleteproduct(id:string) {
    const product=await Product.findByIdAndDelete(id);
    return product;
  }
}

export default new ProductService();
