import { Request, Response } from 'express';
import { discount } from '../../../model/discount';

export const getAllDiscounts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search
      ? parseFloat(req.query.search as string)
      : null;

    // Construct query object
    const query = search !== null ? { percentage: search } : {};

    // Get total count for pagination
    const totalDiscounts = await discount.countDocuments(query);
    const discounts = await discount.find(query).skip(skip).limit(limit);

    // Respond with paginated discounts
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalDiscounts / limit),
      totalDiscounts,
      discounts,
    });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ message: `Failed to retrieve discounts: ${error.message}` });
  }
};
