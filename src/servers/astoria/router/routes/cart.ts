
import Express from 'express';
import * as cartController from '../../controllers/cart';
import { isAuth } from '../../middleware/is-auth';


const router: Express.Router = Express.Router();

router.use('/add-product', isAuth, cartController.addProductToCart);

router.use('/remove-product', cartController.removeProductFromCart);


export default router;
