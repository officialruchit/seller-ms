import { Request, Response } from 'express';
import { SalesReport } from '../model/seller';

/**
 * Controller function to update a sales report.
 *
 * @param req - Express Request object, containing the sales report ID in the request parameters and the updated data in the request body
 * @param res - Express Response object, used to send the response back to the client
 */
export const updateSalesReport = async (req: Request, res: Response) => {
  try {
    // Extract the sales report ID from the request parameters
    const { id } = req.params;

    // Extract the updated data from the request body
    const updatedata = req.body;

    // Find the sales report by its ID and update it with the provided data
    const report = await SalesReport.findByIdAndUpdate(id, updatedata, {
      new: true, // Return the updated document
    });

    // If the sales report is not found, respond with status 404 (Not Found) and an error message
    if (!report) {
      return res.status(404).json({ message: 'Sales report not found' });
    }

    // Respond with status 200 (OK) and return the updated sales report data
    res.status(200).json({ message: 'Sales report updated', report });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
