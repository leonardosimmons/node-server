
import Express from 'express';
import { HttpError } from '../utils/types';

import { randNum } from '../helpers/functions';


export async function test(req: Express.Request, res: Express.Response, next: Express.NextFunction) 
{
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
};
