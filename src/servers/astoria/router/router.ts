
import Express from 'express';
import navbarRoutes from './routes/navbar';
import indexPageRoutes from './routes/index-page';

const router: Express.Router = Express.Router();


router.use('/navbar', navbarRoutes);

router.use('/index', indexPageRoutes);


export default router;
