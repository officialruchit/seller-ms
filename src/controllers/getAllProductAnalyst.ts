import { Request, Response } from 'express';
import { ProductAnalytics } from '../model/seller';

/**
 * Controller function to get all product analytics with pagination and search.
 *
 * @param req - Express Request object, containing pagination and search query parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const getAllProductAnalytics = async (req: Request, res: Response) => {
  try {
    // Extract pagination and search query parameters from the request
    const { page = 1, limit = 10, search = '' } = req.query;

    // Parse page and limit to integers
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string, 10);

    // Ensure search is a string
    const searchString = search as string;

    // Create a search filter using a regular expression for case-insensitive search
    const searchFilter = searchString
      ? { productId: new RegExp(searchString, 'i') }
      : {};

    // Count the total number of documents that match the search filter
    const totalcount = await ProductAnalytics.countDocuments(searchFilter);
    // Calculate the total number of pages
    const totalPages = Math.ceil(totalcount / limitNumber);

    // Find the product analytics data with pagination and search filter applied
    const analyticsData = await ProductAnalytics.find(searchFilter)
      .skip((pageNumber - 1) * limitNumber) // Skip the documents for previous pages
      .limit(limitNumber); // Limit the number of documents to be returned

    // Respond with status 200 (OK) and return the pagination and analytics data
    res.status(200).json({
      totalcount,
      totalPages,
      currentPage: pageNumber,
      analyticsData,
    });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
