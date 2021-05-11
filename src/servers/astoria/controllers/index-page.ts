
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { IndexPage } from '../models/pages';
import { IndexPageHeaderData } from '../utils/types';


export async function getData(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  const indexPage: IndexPage = new IndexPage();

  try {
    const [ headerData ] = await indexPage.fetchHeaders();

    indexPage.setHeaders(headerData);

    res.status(200).json({
      message: 'Data successfully retrieved from database',
      data: indexPage.data
    });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.log = 'unable to retrieve desktop navbar data from database';
    next(err);
  }
};
