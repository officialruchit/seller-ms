import { Request, Response } from 'express';
import { SalesReport } from '../model/seller'; // Adjust the path as necessary

/**
 * Controller function to create a new sales report.
 *
 * @param req - Express Request object, containing the sales report data and userId
 * @param res - Express Response object, used to send the response back to the client
 */
export const createSalesReport = async (req: Request, res: Response) => {
  try {
    // Extract the sellerId from the request object (assuming it's set by middleware)
    const sellerId = req.userId;

    // Destructure the productId from the request body
    const { productId } = req.body;

    const alreadyDone = await SalesReport.findOne({ productId: productId });
    if (alreadyDone) {
      // If a report already exists, respond with status 400 (Bad Request) and an error message
      return res
        .status(400)
        .json({ message: 'A report already exists for this product ID' });
    }

    // Create the sales report data, including the sellerId
    const salesReport = { ...req.body, sellerId };

    // Create a new SalesReport instance with the provided data
    const newReport = new SalesReport(salesReport);

    // Save the new sales report to the database
    await newReport.save();

    // Respond with status 201 (Created) and return a success message along with the created sales report
    res
      .status(201)
      .json({ message: 'Sales report created', report: newReport });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
