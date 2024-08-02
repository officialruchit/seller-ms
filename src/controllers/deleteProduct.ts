import { Request, Response } from 'express';
import { Product } from '../model/seller';
import ProductService from '../service/deleteProduct';

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.deleteproduct(id);
    if (product) {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } catch (err) {
    const error = err as Error;
    res.status(400).json(error.message);
  }
};
