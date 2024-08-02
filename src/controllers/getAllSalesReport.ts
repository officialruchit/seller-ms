import { Request, Response } from 'express';
import { SalesReport } from '../model/seller';

export const getAllSalesReport = async (req: Request, res: Response) => {
  try {
    const report = await SalesReport.find();
    if (!report) {
      return res.status(404).json({ message: 'Sales report not found' });
    }
    res.status(200).json({ message: 'all Sales Report', report });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
