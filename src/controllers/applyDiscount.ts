import { Request, Response } from "express";
import { Product } from "../model/seller";

export const applyDiscount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { discount } = req.body; // Discount percentage or fixed amount

    if (discount < 0 || discount > 100) {
      return res.status(400).json({ message: "Discount must be between 0 and 100." });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { discount },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ product });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
