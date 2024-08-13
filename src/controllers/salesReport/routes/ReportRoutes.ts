import auth from '../../../middleware/auth';
import { createSalesReport } from '../controller/createSales';
import { deleteSalesReport } from '../controller/deleteSalesReport';
import { getAllSalesReport } from '../controller/getAllSalesReport';
import { updateSalesReport } from '../controller/updateSalesReport';
import { Router } from 'express';
const routes = Router();
routes.get('/getAllSalesReport', auth, getAllSalesReport);
routes.post('/createSalesReport', auth, createSalesReport);
routes.put('/updateSalesReport/:id', auth, updateSalesReport);
routes.delete('/deleteSalesReport/:id', auth, deleteSalesReport);

export default routes;
