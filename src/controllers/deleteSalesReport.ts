import { Request, Response } from 'express';
import { SalesReport } from '../model/seller';

export const deleteSalesReport = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const report = await SalesReport.findByIdAndDelete(id)
        if (!report) {
            return res.status(404).json({ message: 'Sales report not found' });
        }
        res.status(200).json({ message: 'sales report delete' })
    } catch (err) {
        const error = err as Error
        res.status(400).json({ Message: error.message })
    }
}