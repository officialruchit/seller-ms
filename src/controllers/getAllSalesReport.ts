import { Request, Response } from 'express';
import { SalesReport } from '../model/seller';

export const getAllSalesReport = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string) || '';

    // Create a query object based on the search term for reportId
    const query = search ? { reportId: new RegExp(search, 'i') } : {};

    // Fetch the sales reports based on the search term and pagination
    const reports = await SalesReport.find(query).skip(skip).limit(limit);

    // Get the total number of sales reports matching the search term
    const totalReports = await SalesReport.countDocuments(query);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalReports / limit),
      totalReports: totalReports,
      reports: reports,
    });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
