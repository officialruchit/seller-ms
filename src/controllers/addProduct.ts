import { Request, Response } from 'express';
import ProductService from '../service/addProduct';
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

    // Combine the request body data with the sellerId to create the new product data
    const productData = { ...req.body, sellerId };

    // Call the ProductService to create a new product in the database
    const product = await ProductService.createProduct(productData);

    // Respond with status 201 (Created) and return the newly created product
    res.status(201).json(product);
  } catch (err) {
    // If an error occurs, catch it and send a response with status 400 (Bad Request)
    // and include the error message
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
