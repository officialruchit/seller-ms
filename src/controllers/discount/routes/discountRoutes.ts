import auth from '../../../middleware/auth';
import { applyDiscount } from '../controller/applyDsicountToProduct';
import { createDiscount } from '../controller/createDiscount';
import { deleteDiscount } from '../controller/deleteDiscount';
import { getAllDiscounts } from '../controller/getAllDsicount';
import { getByIdDiscount } from '../controller/getByIdDiscount';
import { removeDiscountfromProduct } from '../controller/removeDiscountFromProduct';
import { updateDiscount } from '../controller/updateDiscount';
import { updateProductDiscount } from '../controller/updateDiscountForProduct';
import { Router } from 'express';
const routes = Router();
routes.get('/getAllDiscounts', auth, getAllDiscounts);
routes.get('/getByIdDiscount', auth, getByIdDiscount);
routes.post('/createDiscount', auth, createDiscount);
routes.put('/applyDiscount/:productId/:discountId', auth, applyDiscount);
routes.put(
  '/removeDiscountfromProduct/:productId/:discountId',
  auth,
  removeDiscountfromProduct
);
routes.put('/updateProductDiscount', auth, updateProductDiscount);
//routes.patch('/products/:id/discount', applyDiscount);
routes.put('/updateDiscount/:discountId', auth, updateDiscount);
routes.delete('/deleteDiscount/:id', auth, deleteDiscount);
export default routes;
