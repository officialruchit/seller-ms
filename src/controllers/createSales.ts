import { Request, Response } from 'express';
import { SalesReport } from '../model/seller'; // Adjust the path as necessary

// Create a new sales report
export const createSalesReport = async (req: Request, res: Response) => {
  try {
    const sellerId = req.userId
    console.log(sellerId)
    const salesReport = { ...req.body, sellerId };
    const newReport = new SalesReport(salesReport);
    await newReport.save();
    res.status(201).json({ message: 'Sales report created', report: newReport });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};

