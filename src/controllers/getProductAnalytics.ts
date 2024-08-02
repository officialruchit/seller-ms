import { Request, Response } from 'express';
import { ProductAnalytics } from '../model/seller';
export const getProductAnalytics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const analytics = await ProductAnalytics.findById(id);
    if (!analytics) {
      return res.status(404).json({ message: 'Analytics not found' });
    }
    res.status(200).json({ analytics });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ Message: error.message });
  }
};
