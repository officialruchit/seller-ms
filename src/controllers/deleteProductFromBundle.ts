import { Request, Response } from "express";
import { BundleProduct } from "../model/seller";
import mongoose from "mongoose";

// Remove a product from a bundle
export const removeProductFromBundle = async (req: Request, res: Response) => {
  try {
    const { bundleId, productId } = req.params;

    // Ensure productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Update the bundle to remove the specified product
    const updatedBundle = await BundleProduct.findByIdAndUpdate(
        bundleId ,
        { $pull: { products: productId } },
        { new: true }
     
    ).populate("products");

    if (!updatedBundle) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    res.status(200).json({ message: "Product removed from bundle", bundle: updatedBundle });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
};
