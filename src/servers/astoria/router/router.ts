
import Express from 'express';
import navbarRoutes from './routes/navbar';

const router: Express.Router = Express.Router();


router.use('/navbar', navbarRoutes);


export default router;