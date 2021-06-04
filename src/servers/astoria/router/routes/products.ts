
import Express from 'express';
import * as product from '../../controllers/products';


const router: Express.Router = Express.Router();

router.get('/data', product.getAllProducts);

router.use('/', product.getProduct);

export default router;
