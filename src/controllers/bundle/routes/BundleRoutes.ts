import auth from '../../../middleware/auth';
import { addProductToBundle } from '../controller/addProductInBundle';
import { createBundleProduct } from '../controller/createBundle';
import { deleteBundleProduct } from '../controller/deleteBundle';
import { removeProductFromBundle } from '../controller/deleteProductFromBundle';
import { getAllBundle } from '../controller/getbundle';
import { Router } from 'express';
import { getBundleById } from '../controller/getBundleById';
import { updateBundle } from '../controller/updateBundle';
const routes = Router();
routes.get('/getbundle', getAllBundle);
routes.get('/getBundleById/:id', auth, getBundleById);
routes.post('/bundle-products', auth, createBundleProduct);
routes.patch('/bundle/:bundleId/product/:productId', auth, addProductToBundle);
routes.put('/updateBundle/:id', auth, updateBundle);
routes.delete('/bundle/:bundleId', auth, deleteBundleProduct);
routes.delete(
  '/bundle/:bundleId/product/:productId',
  auth,
  removeProductFromBundle
);

export default routes;
