
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

import Express from 'express';
import Path from 'path';
import { consoleText } from './helpers/definitions'; 

import headerRoutes from './routes/headers';
import errorRoutes from './routes/error';
import testRoutes from './test/router';
import astoriaRoutes from './servers/astoria/router';

const server = Express();
const PORT: string = process.env.PORT as string || process.env.DEV_PORT as string;


/* ---------------------  PARSERS  -------------------- */
server.use(Express.json());
server.use(Express.urlencoded({ extended: false }));
server.use(Express.static(Path.join(__dirname, 'public')));


/* ---------------------  ROUTES  --------------------- */
server.use(headerRoutes);
server.use('/astoria', astoriaRoutes);
server.use('/test', testRoutes);
server.use(errorRoutes);


/* ---------------------  SERVER  --------------------- */
server.listen(PORT, () => {
  console.log(consoleText.magenta, `[server] server is listening on port ${PORT}`);
});
