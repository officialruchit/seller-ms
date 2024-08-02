import { Request, Response } from 'express';
import ProductService from '../service/addProduct';

export const addProduct = async (req: Request, res: Response) => {
  try {
    const sellerId = req.userId;
    const productData = { ...req.body, sellerId };
    const product = await ProductService.createProduct(productData);
    res.status(201).json(product);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
