import { Request, Response } from 'express';
import { BundleProduct } from '../../../model/seller';

export const getBundleById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Validate the bundleId
    if (!id) {
      return res.status(400).json({ message: 'Bundle ID is required' });
    }

    // Find the bundle by ID
    const bundle = await BundleProduct.findById(id).populate({
      path: 'products',
      select: 'name description price quantity discountedPrice',
    });

    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json({ bundle });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};
