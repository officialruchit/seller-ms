import { discount } from '../../../model/discount';
import { Request, Response } from 'express';
export const createDiscount = async (req: Request, res: Response) => {
  try {
    const { percentage, description, validFrom, validTo } = req.body;
    const sellerId = req.userId;
    if (!sellerId) {
      res.status(404).json({ message: 'invalid seller is not present' });
    }
    if (!validFrom || !validTo || !description || !percentage) {
      res.status(404).json({ message: "discount's data is missing" });
    }
    if (percentage < 0 || percentage > 100) {
      return res
        .status(400)
        .json({ message: 'Discount percentage must be between 0 and 100.' });
    }
    const currentDate = new Date();
    const fromDate = new Date(validFrom);
    const toDate = new Date(validTo);

    if (fromDate < currentDate) {
      return res
        .status(400)
        .json({ message: '"validFrom" date must be in the future.' });
    }

    if (toDate < currentDate) {
      return res
        .status(400)
        .json({ message: '"validTo" date must be in the future.' });
    }

    if (toDate <= fromDate) {
      return res
        .status(400)
        .json({ message: '"validTo" date must be after "validFrom" date.' });
    }
    const newDiscount = new discount({
      percentage,
      description,
      validFrom,
      validTo,
      sellerId,
    });
    const data = await newDiscount.save();
    res.status(201).json({ message: data });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
