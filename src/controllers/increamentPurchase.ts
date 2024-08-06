import { Request, Response } from 'express';
import { ProductAnalytics } from '../model/seller';
import { v4 as uuidv4 } from 'uuid';

/**
 * Controller function to increment the purchase count for a product.
 *
 * @param req - Express Request object, containing the product ID in the request parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const increamentPurchase = async (req: Request, res: Response) => {
  try {
    // Extract the product ID from the request parameters
    const { productId } = req.params;

    // Find the ProductAnalytics document for the given productId
    // Increment the purchases count by 1 and set a unique analyticsId if inserting a new document
    const analytics = await ProductAnalytics.findOneAndUpdate(
      { productId: productId }, // Query filter to find the document by productId
      {
        $inc: { purchases: 1 }, // Increment the purchases count
        $setOnInsert: { analyticsId: uuidv4() }, // Set unique analyticsId only when a new document is created
      },
      { new: true, upsert: true } // Options: return the updated document, create if not exists
    );

    // Respond with status 200 (OK) and return a success message along with the updated analytics data
    res.status(200).json({ message: 'Purchases incremented', analytics });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 500 (Internal Server Error)
    // and include the error message
    const error = err as Error;
    res.status(500).json({ Message: error.message });
  }
};
