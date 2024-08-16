import { discount } from '../../../model/discount';
import { Request, Response } from 'express';
import { Product } from '../../../model/product';

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

    // Validate the productId and discountId
    if (!productId || !discountId) {
      return res
        .status(400)
        .json({ message: 'Missing productId or discountId' });
    }

    // Check if the product exists
    const productAvalibility = await Product.findById(productId);
    if (!productAvalibility) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const dicountAvalibility = await discount.findById(discountId);
    if (!dicountAvalibility) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure the product belongs to the seller
    if (productAvalibility.sellerId.toString() !== sellerId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized: You do not own this product' });
    }

    // Check if the product has the discount applied
    if (
      !productAvalibility.discount ||
      productAvalibility.discount.toString() !== discountId
    ) {
      return res
        .status(400)
        .json({ message: 'This discount is not applied to the product' });
    }

    // Update the product to remove the discount and reset the price
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { discount: null, discountedPrice: productAvalibility.price }, // Reset discount and discountedPrice
      { new: true }
    ).populate('category', 'name description'); // Populate only name and description of category

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: 'Product not found after update' });
    }

    // Send a successful response
    res.status(200).json({
      message: 'Discount removed successfully',
      product: updatedProduct,
    });
  } catch (err) {
    const error = err as Error;
    console.error('Error removing discount:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
