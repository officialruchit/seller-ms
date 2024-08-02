import { Request, Response } from 'express';
import { ProductAnalytics } from '../model/seller';
import { v4 as uuidv4 } from 'uuid';

export const incrementViews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Find and update the document or create a new one
    const analytics = await ProductAnalytics.findOneAndUpdate(
      { productId: productId },
      {
        $inc: { views: 1 },
        $setOnInsert: { analyticsId: uuidv4() }, // Set unique analyticsId only on insert
      },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Views incremented', analytics });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ Message: error.message });
  }
};
