
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { DesktopNavbar } from '../models/navbar/desktop';
import { DesktopNavBarData } from '../utils/types';


export async function getDesktopData(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  const desktop = new DesktopNavbar();

  try {
    const [ data ] = await desktop.fetchData();
    const token: DesktopNavBarData = desktop.createToken(data);
    
    res.status(200).json({
      message: 'Data successfully retrieved from database',
      data: token
    });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.log = 'unable to retrieve desktop navbar data from database';
    next(error);
  }
};
