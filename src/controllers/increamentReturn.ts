import { Request, Response } from "express";
import { ProductAnalytics } from "../model/seller";

export const incrementReturns = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const analytics = await ProductAnalytics.findByIdAndUpdate(productId, { $inc: { returns: 1 } }, { new: true, upsert: true })

        res.status(200).json({ message: "Returns incremented", analytics });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
};
