
import Express from 'express';
import * as controller from './controller';

const router: Express.Router = Express.Router();

router.use('/', controller.test);

export default router;