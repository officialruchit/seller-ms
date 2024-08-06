import { discount } from '../model/discount';
import { Request, Response } from 'express';
import { Product } from '../model/seller';

export const applyDiscount = async (req: Request, res: Response) => {
  try {
    const { productId, discountId } = req.params;
    const sellerId = req.userId;
    if (!sellerId) {
      res.status(404).json({ message: 'invalid seller is not present' });
    }
    if (!productId) {
      res.status(404).json({ message: ' missing productId' });
    }

    const discountAvalibility = await discount.findById(discountId);
    if (!discountAvalibility) {
      res.status(400).json({ message: 'discount not fount' });
    }

    const productAvalibility = await Product.findById(productId);
    if (!productAvalibility) {
      res.status(400).json({ message: 'product not fount' });
    }

    const discountData = await Product.findByIdAndUpdate(
      productId,
      { discount: discountId },
      { new: true }
    )
      .populate('discount')
      .populate('category');

    if (!discountData) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(201).json({ message: discountData });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
