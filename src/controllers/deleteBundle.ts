import { Request, Response } from "express";
import { BundleProduct } from "../model/seller";

// Delete a bundle product
export const deleteBundleProduct = async (req: Request, res: Response) => {
  try {
    const { bundleId } = req.params;

    // Find and delete the bundle product
    const deletedBundle = await BundleProduct.findByIdAndDelete(bundleId);

    if (!deletedBundle) {
      return res.status(404).json({ message: "Bundle not found" });
    }

    res.status(200).json({ message: "Bundle deleted successfully", bundle: deletedBundle });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
