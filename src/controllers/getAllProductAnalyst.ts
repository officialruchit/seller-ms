import { Request, Response } from 'express';
import { ProductAnalytics } from '../model/seller';

// Get all product analytics with pagination and search
export const getAllProductAnalytics = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string, 10);
    const searchString = search as string;

    const searchFilter = searchString
      ? { productId: new RegExp(searchString, 'i') }
      : {};

    const totalcount = await ProductAnalytics.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalcount / limitNumber);

    const analyticsData = await ProductAnalytics.find(searchFilter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(200).json({
      totalcount,
      totalPages,
      currentPage: pageNumber,
      analyticsData,
    });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
