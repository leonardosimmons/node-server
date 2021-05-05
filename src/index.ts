
if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config();
}

import Express from 'express';
import Path from 'path';
import { consoleText } from './helpers/definitions'; 

import headerRoutes from './routes/headers';
import errorRoutes from './routes/headers';

const server = Express();
const PORT: string = process.env.PORT as string || process.env.DEV_PORT as string;


/* ---------------------  PARSERS  -------------------- */
server.use(Express.json());
server.use(Express.static(Path.join(__dirname, 'public')));


/* ---------------------  ROUTES  --------------------- */
server.use(headerRoutes);
server.use(errorRoutes);

const test = "apples, bananas, pears, bears, pineapple";
const res = test.split(/[, ]+/);
const len = res.length;
let str = '?';

if (res.length > 1) {
  for (let i = 0; i < res.length - 1; i++) {
    str = str.concat(' ?');
  }
}

console.log(res);

/* ---------------------  SERVER  --------------------- */
server.listen(PORT, () => {
  console.log(consoleText.magenta, `[server] server is listening on port ${PORT}`);
});
