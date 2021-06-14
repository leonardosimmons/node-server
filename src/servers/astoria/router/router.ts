
import Express from 'express';
import userRoutes from './routes/user';
import navbarRoutes from './routes/navbar';
import indexPageRoutes from './routes/index-page';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';

const router: Express.Router = Express.Router();

router.use('/cart', cartRoutes);

router.use('/index', indexPageRoutes);

router.use('/navbar', navbarRoutes);

router.use('/product', productRoutes);

router.use('/user', userRoutes);


export default router;
