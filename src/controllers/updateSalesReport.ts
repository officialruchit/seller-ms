import { Request, Response } from 'express';
import { SalesReport } from '../model/seller';

export const updateSalesReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedata = req.body;
    const report = await SalesReport.findByIdAndUpdate(id, updatedata, {
      new: true,
    });
    if (!report) {
      return res.status(404).json({ message: 'Sales report not found' });
    }
    res.status(200).json({ message: 'update Sales Report', report });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
