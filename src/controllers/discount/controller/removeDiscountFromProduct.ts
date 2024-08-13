import { discount, IDiscount } from '../../../model/discount';
import { Request, Response } from 'express';
import { Product, IProduct } from '../../../model/seller';

export const removeDiscountfromProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId, discountId } = req.params;
    const sellerId = req.userId;

    // Validate the sellerId
    if (!sellerId) {
      return res
        .status(404)
        .json({ message: 'Invalid seller: seller is not present' });
    }

    // Validate the productId
    if (!productId) {
      return res.status(404).json({ message: 'Missing productId' });
    }

    // Check if the discount exists
    const discountAvalibility = (await discount.findById(
      discountId
    )) as IDiscount;
    if (!discountAvalibility) {
      return res.status(400).json({ message: 'Discount not found' });
    }

    // Check if the product exists
    const productAvalibility = (await Product.findById(productId)) as IProduct;
    if (!productAvalibility) {
      return res.status(400).json({ message: 'Product not found' });
    }

    // Check if the product has the discount applied
    if (productAvalibility.discount?.toString() !== discountId) {
      return res
        .status(400)
        .json({ message: 'This discount is not applied to the product' });
    }

    // Update the product to remove the discount and reset the price
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { discount: null, discountedPrice: productAvalibility.price }, // Reset discount and discountedPrice
      { new: true }
    ).populate('category');

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: 'Product not found after update' });
    }

    // Send a successful response
    res
      .status(200)
      .json({
        message: 'Discount removed successfully',
        product: updatedProduct,
      });
  } catch (err) {
    const error = err as Error;
    console.error('Error removing discount:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
