
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { DesktopNavbar } from '../models/navbar/desktop';
import { MobileNavbar } from '../models/navbar/mobile';
import { DesktopNavBarData, MobileNavbarData } from '../utils/types';


export async function getDesktopData(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  const desktop: DesktopNavbar = new DesktopNavbar();

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

export async function getMobileData(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  const mobile: MobileNavbar = new MobileNavbar();

  try {
    const [ data ] = await  mobile.fetchData();
    const token: MobileNavbarData = mobile.createToken(data);

    res.status(200).json({
      message: 'Data successfully retrieved from database',
      data: token
    });
  }
  catch(err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.log = ('unable to retrieve mobile navbar data from database');
    next(error);
  }
};
