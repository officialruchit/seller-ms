import { Request, Response } from 'express';
import { Product } from '../../../model/seller';

/**
 * Controller function to update a product's details.
 *
 * @param req - Express Request object, containing the product ID in the request parameters and the updated data in the request body
 * @param res - Express Response object, used to send the response back to the client
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Extract the updated data from the request body
    const updateData = req.body;

    // Find the product by its ID and update it with the provided data
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    // If the product is not found, respond with status 404 (Not Found) and an error message
    if (!product) {
      return res.status(404).json({ Message: 'Product not found' });
    }

    // Respond with status 200 (OK) and return the updated product data
    res.status(200).json({ Product: product });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
