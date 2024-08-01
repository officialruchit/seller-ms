import { Request, Response } from "express";
import { ProductAnalytics } from "../model/seller";
import { v4 as uuidv4 } from 'uuid';
export const incrementReturns = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const analytics = await ProductAnalytics.findByIdAndUpdate(
            productId,
            {
                $inc: { returns: 1 }
, $setOnInsert: { analyticsId: uuidv4() }
            }, { new: true, upsert: true })

        res.status(200).json({ message: "Returns incremented", analytics });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
};
