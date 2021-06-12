
import Express from 'express';
import * as user from '../../controllers/user';

const router: Express.Router = Express.Router();

router.use('/delete', user.remove);

router.use('/data', user.getAll);

router.use('/add', user.add);

router.use('/update', user.update);

router.use('/', user.get);

export default router;
