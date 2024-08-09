import { Request, Response } from 'express';
import { Product, IProduct, ProductAnalytics ,IAnalyst} from '../model/seller';
import { v4 as uuidv4 } from 'uuid';
export const increamentPurchase = async (req: Request, res: Response) => {
  try {
  
    const { productId } = req.params;

    const product = await Product.findById(productId).exec() as IProduct | null;
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const productPrice = product.price;

    const analytics = await ProductAnalytics.findOneAndUpdate(
      { productId: productId }, // Query filter to find the document by productId
      {
        $inc: { purchases: 1 }, // Increment the purchases count
        $setOnInsert: { analyticsId: uuidv4() }, // Set unique analyticsId only when a new document is created
      },
      { new: true, upsert: true } // Options: return the updated document, create if not exists
    ).populate('productId') as IAnalyst;
    if (analytics) {
      // Calculate the total revenue based on the updated purchase count
      analytics.totalRevenue = analytics.purchases * productPrice;
      await analytics.save();
    }

    res.status(200).json({ message: 'Purchases incremented and total revenue updated', analytics });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ Message: error.message });
  }
};


