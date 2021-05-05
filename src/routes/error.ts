
import Express from 'express';
import { consoleText } from '../helpers/definitions';
import { HttpError } from '../utils/types';

const router: Express.Router = Express.Router();


router.use((error: HttpError, _: Express.Request, res: Express.Response) => {
  console.log(consoleText.red, `[error] ${ error.log ? error.log : error.message }`);
  const status = error.statusCode;
  const message = error.log? error.log : error.message;

  res.status(status).json({
    message: message
  });
});

export default router;