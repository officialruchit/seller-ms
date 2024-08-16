import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ProductCategory from '../../../model/ProductCategory';
import { Product } from '../../../model/product';

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

    const { name, description, price, quantity, category } = req.body;

    // Validate required fields individually
    if (!name) {
      return res.status(400).json({ message: 'Product name is required.' });
    }

    if (price === undefined || price === null) {
      return res.status(400).json({ message: 'Product price is required.' });
    }

    if (!quantity) {
      return res.status(400).json({ message: 'Product quantity is required.' });
    }

    if (!category) {
      return res.status(400).json({ message: 'Product category is required.' });
    }

    // Check if the category ID is valid
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID.' });
    }

    // Check if the price is a positive decimal number
    if (typeof price !== 'number' || price <= 0 || !Number.isFinite(price)) {
      return res
        .status(400)
        .json({ message: 'Price must be a positive decimal number.' });
    }

    // Check if the quantity is a positive integer
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be a positive integer.' });
    }

    // Check if the category exists
    const Productcategory = await ProductCategory.findById(category);
    if (!Productcategory) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Create the new product
    const NewProduct = new Product({
      sellerId,
      name,
      description,
      price,
      quantity,
      category,
    });

    // Save the product to the database
    const saveData = await NewProduct.save();
    res.status(201).json(saveData);
  } catch (err) {
    // Handle errors
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
