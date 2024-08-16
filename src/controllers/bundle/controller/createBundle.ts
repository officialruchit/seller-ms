import { Request, Response } from 'express';
import { BundleProduct } from '../../../model/seller';
import { Product } from '../../../model/product';
import mongoose from 'mongoose';

export const createBundleProduct = async (req: Request, res: Response) => {
  try {
    const sellerId = req.userId;
    const { name, description, products, discountPercentage } = req.body;

    if (!sellerId) {
      return res.status(400).json({ message: 'Invalid seller; seller is not present' });
    }
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'At least one product is required' });
    }
    if (discountPercentage && (typeof discountPercentage !== 'number' || discountPercentage < 0 || discountPercentage > 100)) {
      return res.status(400).json({ message: 'Discount must be a number between 0 and 100' });
    }

    const productObjectIds = products.map((productId: string) => {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: `Invalid product ID: ${productId}` });
      }
      return new mongoose.Types.ObjectId(productId);
    });

    const productsData = await Product.find({ _id: { $in: productObjectIds } });

    if (productsData.length !== productObjectIds.length) {
      return res.status(404).json({ message: 'One or more products not found' });
    }

    const totalOriginalPrice = productsData.reduce((total, product) => total + product.price, 0);
    const discountPrice = discountPercentage ? totalOriginalPrice * (1 - discountPercentage / 100) : totalOriginalPrice;
    const totalPrice = totalOriginalPrice
    const bundleProduct = new BundleProduct({
      sellerId,
      name,
      description,
      products: productObjectIds,
      discountPercentage,
      discountPrice,
      totalPrice
    });

    await bundleProduct.save();

    res.status(201).json({ message: 'Bundle product created', bundleProduct });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
