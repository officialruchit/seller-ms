import { Request, Response } from 'express';
import { ProductAnalytics } from '../../../model/seller';

/**
 * Controller function to get product analytics by ID.
 *
 * @param req - Express Request object, containing the analytics ID in the request parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const getProductAnalytics = async (req: Request, res: Response) => {
  try {
    // Extract the analytics ID from the request parameters
    const { id } = req.params;

    // Find the product analytics by its ID
    const analytics = await ProductAnalytics.findById(id).populate('productId');

    // If no analytics is found, respond with status 404 (Not Found) and an error message
    if (!analytics) {
      return res.status(404).json({ message: 'Analytics not found' });
    }

    // Respond with status 200 (OK) and return the analytics data
    res.status(200).json({ analytics });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 500 (Internal Server Error)
    // and include the error message
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
