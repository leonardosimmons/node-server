
import Express from 'express';
import * as cartController from '../../controllers/cart';


const router: Express.Router = Express.Router();

router.use('/add-product', cartController.addProductToCart);

router.use('/remove-product', cartController.removeProductFromCart);


export default router;
