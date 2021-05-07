
import Express from 'express';
import * as navbar from '../../controllers/navbar';

const router: Express.Router = Express.Router();

// Desktop
router.get('/desktop', navbar.getDesktopData);


export default router;
