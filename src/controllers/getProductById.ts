import { Request, Response } from 'express';
import { Product } from '../model/seller';

/**
 * Controller function to get a product by its ID.
 *
 * @param req - Express Request object, containing the product ID in the request parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const getById = async (req: Request, res: Response) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by its ID
    const product = await Product.findById(id).populate('category').populate('discount');

    // If no product is found, respond with status 404 (Not Found) and an error message
    if (!product) {
      return res.status(404).json({ Message: 'Product not found' });
    }

    // Respond with status 200 (OK) and return the product data
    res.status(200).json({ Product: product });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
