
if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

import Express from 'express';
import { consoleText } from './helpers/definitions'; 

import headerRoutes from './routes/headers';
import welcomeRoutes from './routes/welcome';
import errorRoutes from './routes/error';
import astoriaRoutes from './servers/astoria/router/router';
import portfolioRoutes from './servers/portfolio/router/router';
import testRoutes from './test/router';

const {
  PORT,
  DEV_PORT
} = process.env;


const server = Express();
const SERVER_PORT: string = PORT as string || DEV_PORT as string;


/* ---------------------  PARSERS  -------------------- */
server.use(Express.json());
server.use(Express.urlencoded({ extended: false }));


/* ---------------------  ROUTES  --------------------- */
server.use(headerRoutes);
server.use('/', welcomeRoutes);
server.use('/portfolio', portfolioRoutes);
server.use('/astoria', astoriaRoutes);
server.use('/test', testRoutes);
server.use(errorRoutes);


/* ---------------------  SERVER  --------------------- */
server.listen(SERVER_PORT, () => {
  console.log(consoleText.magenta, `[server] server is listening on port ${SERVER_PORT}`);
});
