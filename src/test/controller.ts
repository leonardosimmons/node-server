
import Express from 'express';
import { HttpError } from '../utils/types';

import { randNum } from '../helpers/functions';


export async function test(req: Express.Request, res: Express.Response, next: Express.NextFunction) 
{
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Easy Company</title></head>');
  res.write('<body><h1>Test body</h1></body>')
  res.write('</html>');
};
