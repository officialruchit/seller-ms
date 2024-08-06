import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ProductCategory from '../model/ProductCategory';
import { Product } from '../model/seller';

/**
 * Controller function to handle the addition of a new product.
 *
 * @param req - Express Request object, containing the product data and userId
 * @param res - Express Response object, used to send the response back to the client
 */
export const addProduct = async (req: Request, res: Response) => {
  try {
    // Extract the sellerId from the request object (assuming it's set by middleware)
    const sellerId = req.userId;

    const {
      productId,
      name,
      description,
      price,
      quantity,
      discount,
      category,
    } = req.body;

    // Check if the category ID is valid
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const Productcategory = await ProductCategory.findById(category);
    if (!Productcategory) {
      res.status(404).json({ message: 'category not found' });
    }

    const NewProduct = new Product({
      productId,
      sellerId,
      name,
      description,
      price,
      quantity,
      discount,
      category,
    });

    const saveData = await NewProduct.save();
    res.status(201).json(saveData);
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
