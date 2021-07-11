
import Express from 'express';

const router: Express.Router = Express.Router();

router.use('/', (_: Express.Request, res: Express.Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Easy Company</title></head>');
  res.write('<body><h1>Welcome to the Easy Company node server</h1></body>')
  res.write('</html>');
});

export default router;