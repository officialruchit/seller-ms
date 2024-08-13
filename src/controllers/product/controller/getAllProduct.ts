import { Request, Response } from 'express';
import { Product } from '../../../model/seller';

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string) || '';

    // Create a query object based on the search term
    const query = search ? { name: new RegExp(search, 'i') } : {};

    // Fetch the products based on the search term and pagination
    const products = await Product.find(query)
      .populate('category')
      .populate('discount')
      .skip(skip)
      .limit(limit);

    // Get the total number of products matching the search term
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts: totalProducts,
      Products: products,
    });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};