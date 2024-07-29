import { Request, Response } from "express";
import { Product } from "../model/seller";
export const getAll = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json({ Products: products });
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ Message: error.message });
    }
};
