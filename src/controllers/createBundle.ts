import { Request, Response } from 'express';
import { BundleProduct, Product } from '../model/seller'; // Adjust the path as necessary
import mongoose from 'mongoose';

// Create a new bundle product
export const createBundleProduct = async (req: Request, res: Response) => {
  try {
    const sellerId = req.userId;
    const { bundleId, name, description, products, discount } = req.body;

    // Convert product IDs from strings to ObjectIds
    const productObjectIds = products.map((productId: string) => new mongoose.Types.ObjectId(productId));

    const bundleProduct = new BundleProduct({
      bundleId,
      sellerId,
      name,
      description,
      products: productObjectIds,
      discount
    });

    await bundleProduct.save();
    res.status(201).json({ message: 'Bundle product created', bundleProduct });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
