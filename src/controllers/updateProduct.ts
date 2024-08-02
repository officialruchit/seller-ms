import { Request, Response } from 'express';
import { Product } from '../model/seller';

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ Message: 'Product not found' });
    }
    res.status(200).json({ Product: product });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ Message: error.message });
  }
};
