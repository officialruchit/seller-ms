import { Router } from 'express';
const routes = Router();
import Analyticsroutes from '../controllers/analytics/routes/analyticsRoute';
import Bunleroutes from '../controllers/bundle/routes/BundleRoutes';
import Discountroutes from '../controllers/discount/routes/discountRoutes';
import Productroutes from '../controllers/product/routes/productRoutes';
import Reportroutes from '../controllers/salesReport/routes/ReportRoutes';
import { getAllcategory } from '../controllers/getAllCategory';
routes.get('/getAllcategory', getAllcategory);
routes.use('/', Analyticsroutes);
routes.use('/', Bunleroutes);
routes.use('/', Discountroutes);
routes.use('/', Productroutes);
routes.use('/', Reportroutes);

export default routes;
