import { Request, Response } from "express"
import {BundleProduct} from '../model/seller'
export const getAllBundle = async (req: Request, res: Response) => {
    try {
        const bundleProducts = await BundleProduct.find().populate("products").exec();
        console.log("hi")
        res.status(200).json({ bundleProducts });
    } catch (err) {
        const error = err as Error
        res.status(400).json({ Message: error.message })
    }
}