import { Request, Response } from 'express';
import { BundleProduct, IBundleProduct } from '../../../model/seller';
import mongoose from 'mongoose';
import { Product } from '../../../model/product';

export const removeProductFromBundle = async (req: Request, res: Response) => {
  try {
    const { bundleId, productId } = req.params;

    // Ensure productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find the bundle
    const bundle = (await BundleProduct.findById(bundleId)) as IBundleProduct;
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    // Check if the product is in the bundle
    const productIndex = bundle.products.indexOf(
      new mongoose.Types.ObjectId(productId)
    );
    if (productIndex === -1) {
      return res.status(400).json({ message: 'Product not in the bundle' });
    }

    // Remove the product from the bundle
    bundle.products.splice(productIndex, 1);

    // Recalculate the total price of the bundle
    const productsData = await Product.find({ _id: { $in: bundle.products } });
    const totalOriginalPrice = productsData.reduce((total, product) => total + product.price, 0);
    
    bundle.totalPrice = totalOriginalPrice;

    // Recalculate the discount price if a discount is applied
    bundle.discountPrice = bundle.discountPercentage
      ? totalOriginalPrice * (1 - bundle.discountPercentage / 100)
      : totalOriginalPrice;

    // Save the updated bundle
    await bundle.save();

    res.status(200).json({ message: 'Product removed from bundle', bundle });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
