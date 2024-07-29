import { Router } from 'express';
import auth from '../middleware/auth';
import { addProduct} from '../controllers/addProduct'
import {deleteProduct} from '../controllers/deleteProduct'
import {getAll} from '../controllers/getAllProduct'
import {getById} from '../controllers/getProductById'
import {updateProduct}from '../controllers/updateProduct'
const routes = Router();
routes.get('/',auth,getAll)
routes.get('/:id', auth,getById);
routes.post('/addProduct',auth,addProduct)
routes.put('/updateProduct/:id',auth,updateProduct)
routes.delete('/deleteProduct/:id',auth,deleteProduct)

export default routes;
