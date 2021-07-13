
import Express, { NextFunction } from 'express';
import { randNum } from '../helpers/functions';
import { HttpError } from '../utils/types';

const router: Express.Router = Express.Router();

router.use('/', (_: Express.Request, res: Express.Response, next: NextFunction) => {
  try {
    const min: number = 100000000;
    const max: number = 999999999;

    const num: number = randNum(min, max);

    res.status(200).json({
      message: 'Success',
      payload: num
    });
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'test failed';
    next(err);
  }
});

export default router;