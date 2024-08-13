import { Request, Response } from 'express';
import ProductCategory from '../model/ProductCategory';

export const getAllcategory = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const PageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const searchString = search as string;
    const filter = searchString ? { name: new RegExp(searchString, 'i') } : {};
    const categories = await ProductCategory.find(filter).limit(limitNumber);
    const totalDocs = await ProductCategory.countDocuments(filter);
    const totalPage = Math.ceil(totalDocs / limitNumber);
    res
      .status(200)
      .json({ totalDocs, totalPage, limitNumber, PageNumber, categories });
  } catch (err) {
    const error = err as Error;
    res.status(401).json({ message: error.message });
  }
};
