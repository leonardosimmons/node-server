
import Express from 'express';
import * as navbar from '../../controllers/navbar';

const router: Express.Router = Express.Router();

// Desktop
router.get('/desktop/static-data', navbar.getDesktopData);

// Mobile
router.get('/mobile/static-data', navbar.getMobileData);


export default router;
