import { Router } from 'express';
const routes = Router();
import auth from '../../../middleware/auth';
import { getAllProductAnalytics } from '../controller/getAllProductAnalyst';
import { getProductAnalytics } from '../controller/getProductAnalytics';
import { increamentPurchase } from '../controller/increamentPurchase';
import { incrementReturns } from '../controller/increamentReturn';
import { incrementViews } from '../controller/increamentViews';
routes.get('/getAllProductAnalytics', getAllProductAnalytics);
routes.get('/product/analytics/:id', auth, getProductAnalytics);
routes.put('/product/:productId/views', auth, incrementViews);
routes.patch('/product/:productId/return', auth, incrementReturns);
routes.patch('/product/:productId/purchase', auth, increamentPurchase);

export default routes;
