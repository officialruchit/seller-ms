import { Request, Response } from 'express';
import { Product, IProduct } from '../../../model/product';

/**
 * Controller function to get a product by its ID.
 *
 * @param req - Express Request object, containing the product ID in the request parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const getById = async (req: Request, res: Response) => {
  try {
    // Extract the product ID from the request parameters
    const id = req.params.id;

    // Find the product by its ID
    const product = (await Product.findById(id)
      .populate({
        path: 'category',
        select: 'name description -_id',
      })
      .populate({
        path: 'discount',
        select: 'percentage description validFrom validTo -_id',
      })) as IProduct;

    if (product.blocked) {
      res.status(401).json({ message: 'product is unavailable' });
    }
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
