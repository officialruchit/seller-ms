import { Request, Response } from "express";
import { ProductAnalytics } from '../model/seller'

export const increamentPurchase = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params
        const analytics = await ProductAnalytics.findByIdAndUpdate(productId, { $inc: { purchases: 1 } }, { new: true, upsert: true })
        res.status(200).json({ message: "Purchases incremented", analytics });
    } catch (err) {
        const error = err as Error
        res.status(500).json({ Messsage: error.message })
    }
}