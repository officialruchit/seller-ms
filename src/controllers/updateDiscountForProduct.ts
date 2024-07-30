import { Request, Response } from "express";
import { Product } from "../model/seller";

// Update discount for a product
export const updateProductDiscount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { discount } = req.body;

    // Validate discount
    if (typeof discount !== 'number' || discount < 0 || discount > 100) {
      return res.status(400).json({ message: "Invalid discount value" });
    }

    // Update the product with the new discount
    const product = await Product.findByIdAndUpdate(
      id,
      { discount },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Discount updated", product });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
