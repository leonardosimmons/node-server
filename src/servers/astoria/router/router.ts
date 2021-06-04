
import Express from 'express';
import navbarRoutes from './routes/navbar';
import indexPageRoutes from './routes/index-page';
import productRoutes from './routes/products';

const router: Express.Router = Express.Router();


router.use('/navbar', navbarRoutes);

router.use('/index', indexPageRoutes);

router.use('/product', productRoutes);

export default router;
