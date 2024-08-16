import { discount, IDiscount } from '../../../model/discount';
import { Request, Response } from 'express';
import { Product, IProduct } from '../../../model/product';

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

    const discountAvalibility = (await discount.findById(
      discountId
    )) as IDiscount;
    if (!discountAvalibility) {
      res.status(400).json({ message: 'discount not fount' });
    }

    const productAvalibility = (await Product.findById(productId)) as IProduct;
    if (!productAvalibility) {
      res.status(400).json({ message: 'product not fount' });
    }

    const originalPrice = productAvalibility.price;
    const discountPercentage = discountAvalibility.percentage;
    const discountedPrice =
      originalPrice - (originalPrice * discountPercentage) / 100;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { discount: discountId, discountedPrice: discountedPrice },
      { new: true }
    )
      .populate({
        path: 'discount',
        select: 'percentage description validFrom validTo -_id',
      })
      .populate({
        path: 'category',
        select: 'name description -_id',
      });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(201).json({ message: updatedProduct });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
