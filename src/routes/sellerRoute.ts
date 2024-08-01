import { Router } from 'express';
const routes = Router();
import auth from '../middleware/auth';
import { addProduct } from '../controllers/addProduct'
import { deleteProduct } from '../controllers/deleteProduct'
import { getAllProduct } from '../controllers/getAllProduct'
import { getById } from '../controllers/getProductById'
import { updateProduct } from '../controllers/updateProduct'
import { createSalesReport } from '../controllers/createSales'
import { createBundleProduct } from '../controllers/createBundle'
import { getAllBundle } from '../controllers/getbundle'
import { removeProductFromBundle } from '../controllers/deleteProductFromBundle'
import { addProductToBundle} from '../controllers/addProductInBundle'
import { updateProductDiscount } from '../controllers/updateDiscountForProduct'
import { incrementViews } from '../controllers/increamentViews'
import { increamentPurchase } from '../controllers/increamentPurchase'
import { incrementReturns } from '../controllers/increamentReturn'
import { getProductAnalytics } from '../controllers/getProductAnalytics';
import { deleteSalesReport } from '../controllers/deleteSalesReport'
import { getAllSalesReport } from '../controllers/getAllSalesReport'
import { updateSalesReport } from '../controllers/updateSalesReport'
import { applyDiscount } from '../controllers/applyDiscount';
import{deleteBundleProduct} from '../controllers/deleteBundle'
import {getAllProductAnalytics} from '../controllers/getAllProductAnalyst'
routes.get('/getAllProductAnalytics', getAllProductAnalytics)
routes.get('/getAllSalesReport', auth, getAllSalesReport)
routes.get('/getbundle', getAllBundle)
routes.get('/', auth, getAllProduct)
routes.get('/:id', auth, getById);
routes.get("/product/analytics/:id", auth, getProductAnalytics);

routes.post('/addProduct', auth, addProduct)
routes.post('/createSalesReport', auth, createSalesReport)
routes.post('/bundle-products', auth, createBundleProduct);

routes.put('/updateSalesReport/:id', auth, updateSalesReport)
routes.put('/updateProduct/:id', auth, updateProduct)
routes.put('/updateProductDiscount', auth, updateProductDiscount)
routes.patch('/products/:id/discount', applyDiscount);

routes.patch("/bundle/:bundleId/product/:productId", auth, addProductToBundle)
routes.put('/product/:productId/views', auth, incrementViews)
routes.patch('/product/:productId/return', auth, incrementReturns)
routes.patch('/product/:productId/purchase', auth, increamentPurchase)
routes.delete('/bundle/:bundleId', deleteBundleProduct);
routes.delete('/deleteSalesReport/:id', auth, deleteSalesReport)
routes.delete('/deleteProduct/:id', auth, deleteProduct)
routes.delete("/bundle/:bundleId/product/:productId", auth, removeProductFromBundle)

export default routes;
