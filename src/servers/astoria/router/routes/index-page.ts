
import Express from 'express';
import * as index from '../../controllers/index-page';

const router: Express.Router = Express.Router();


router.get('/static-data', index.getData);


export default router;
