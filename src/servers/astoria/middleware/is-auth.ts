
import Express from 'express';
import { HttpError } from '../../../utils/types';

const jwt = require('jsonwebtoken');

const {
  TOKEN_SECRET
} = process.env;


function isAuth(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  let decodedToken;
  const token: string = req.get('Authorization')?.split(' ')[1] as string;

  try{
    decodedToken = jwt.verify(token, TOKEN_SECRET);
  }
  catch(err) {
    err.statusCode = 500;
  }

  if (!decodedToken) {
    const error: HttpError = new Error('Not Authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.u_id = decodedToken.u_id;
  next();
};

export { isAuth };