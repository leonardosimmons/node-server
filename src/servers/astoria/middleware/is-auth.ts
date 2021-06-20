
import { Request, Response, NextFunction} from 'express';
import { HttpError } from '../../../utils/types';

const jwt = require('jsonwebtoken');

const {
  TOKEN_SECRET
} = process.env;


export function isAuth(req: Request, res: Response, next: NextFunction) {
  let decodedToken;
  const authHeader: string = req.header('auth-token') as string;

  if (authHeader) {
    const token: string = authHeader.split(' ')[1] as string;

    try{
      decodedToken = jwt.verify(token, TOKEN_SECRET);
    }
    catch(err) {
      err.statusCode = 500;
    }

    if (!decodedToken) {
      const error: HttpError = new Error('Not Authenticated. Token not recognzied');
      error.statusCode = 401;
      res.status(401).json({message: 'Token not recognized'});
    }

    res.locals.u_id = decodedToken.u_id;
  } 
  
  next();
};
