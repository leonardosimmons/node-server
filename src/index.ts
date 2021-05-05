
if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config();
}

import Express from 'express';
import Path from 'path';

import { consoleText } from './helpers/definitions'; 

const server = Express();
const PORT: string = process.env.PORT as string || process.env.DEV_PORT as string;

/* ---------------------  PARSERS  -------------------- */
server.use(Express.json());
server.use(Express.static(Path.join(__dirname, 'public')));

/* ---------------------  ROUTES  --------------------- */


/* ---------------------  SERVER  --------------------- */
server.listen(PORT, () => {
  console.log(consoleText.magenta, `[server] server is listening on port ${PORT}`);
});
