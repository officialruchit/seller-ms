import { Request, Response } from 'express';
import { Product } from '../model/seller';

/**
 * Controller function to update the discount for a product.
 *
 * @param req - Express Request object, containing the product ID in the request parameters and the new discount value in the request body
 * @param res - Express Response object, used to send the response back to the client
 */
export const updateProductDiscount = async (req: Request, res: Response) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Extract the new discount value from the request body
    const { discount } = req.body;

    // Validate the discount value
    if (typeof discount !== 'number' || discount < 0 || discount > 100) {
      return res.status(400).json({ message: 'Invalid discount value' });
    }

    // Update the product with the new discount
    const product = await Product.findByIdAndUpdate(
      id, // Product ID to find and update
      { discount }, // New discount value
      { new: true } // Options: return the updated document
    );

    // If the product is not found, respond with status 404 (Not Found) and an error message
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with status 200 (OK) and return the updated product data
    res.status(200).json({ message: 'Discount updated', product });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
