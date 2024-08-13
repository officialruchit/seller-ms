import { Request, Response } from 'express';
import { SalesReport } from '../../../model/seller';

/**
 * Controller function to delete a sales report.
 *
 * @param req - Express Request object, containing the sales report ID in the request parameters
 * @param res - Express Response object, used to send the response back to the client
 */
export const deleteSalesReport = async (req: Request, res: Response) => {
  try {
    // Extract the sales report ID from the request parameters
    const { id } = req.params;
    // Find the sales report by its ID and delete it
    const report = await SalesReport.findByIdAndDelete(id);

    // If no report is found, respond with status 404 (Not Found) and an error message
    if (!report) {
      return res.status(404).json({ message: 'Sales report not found' });
    }

    // Respond with status 200 (OK) and return a success message
    res.status(200).json({ message: 'sales report delete' });
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
