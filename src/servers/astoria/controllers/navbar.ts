
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { DesktopNavbar } from '../models/navbar/desktop';


export async function getDesktopData(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  const desktop = new DesktopNavbar();

  try {
    const [ data ] = await desktop.fetchData();
    console.log(data);
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.log = 'unable to retrieve desktop navbar data from database';
    next(error);
  }
};