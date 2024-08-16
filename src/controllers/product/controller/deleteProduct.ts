import { Request, Response } from 'express';
import { Product } from '../../../model/product';

/**
 * Controller function to delete a product.
 *
 * @param req - Express Request object, containing the product ID in the request parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Call the ProductService to delete the product by its ID
    const product = await Product.findByIdAndDelete(id);

    // If the product is deleted successfully, respond with status 200 (OK) and a success message
    if (product) {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json(error.message);
  }
};
