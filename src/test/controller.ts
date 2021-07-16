
import Express from 'express';
import { HttpError } from '../utils/types';

import { randNum } from '../helpers/functions';
import { HashController } from '../models/HashController';
import { HashToken } from '../servers/astoria/utils/types';


export async function test(req: Express.Request, res: Express.Response, next: Express.NextFunction) 
{
  try {
    const hasher: HashController = new HashController();

    const origPw: string = 'John Snow';
    const origToken: HashToken = hasher.hashPassword(origPw);

    const testPw: string = 'John Snow';

    const result = hasher.compare(testPw, origToken);


    res.status(200).json({
      message: 'Success',
      payload: 'test'
    });
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.message = 'test failed';
    next(err);
  }
};
