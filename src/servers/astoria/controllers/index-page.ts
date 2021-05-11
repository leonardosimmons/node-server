
import Express from 'express';
import { HttpError } from '../../../utils/types';
import { IndexPage } from '../models/pages';


export async function getIndexData(_: Express.Request, res: Express.Response, next: Express.NextFunction)
{
  const indexPage: IndexPage = new IndexPage();

  try {
    const [ headers ] = await indexPage.fetchHeaders();
    indexPage.headers = headers;

    res.status(200).json({
      message: 'Data successfully retrieved from database',
      data: headers
    });
  }
  catch (err) {
    const error: HttpError = err;
    error.statusCode = 502;
    error.log = 'unable to retrieve desktop navbar data from database';
    next(err);
  }
};
