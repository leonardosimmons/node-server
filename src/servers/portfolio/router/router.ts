
import Express from 'express';

import nodemailer from 'nodemailer';
const sendGridTransport = require('nodemailer-sendgrid-transport');

const router: Express.Router = Express.Router();

const transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: process.env.EMAIL_API_KEY
  }
}));


router.use('/contact-me-form-submit', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  if (req.body) {
    const fn: string = req.body.firstname;
    const ln: string = req.body.lastname;
    const sub: string = req.body.subject;
    const email: string = req.body.email;
    const msg: string = req.body.message;

    if (msg) {
      transporter.sendMail({
        to: process.env.EMAIL_SENDER as string,
        from: process.env.EMAIL_SENDER as string,
        subject: sub,
        html: `
          <h1>New Contact\n</h1>
          <ul style="list-style-type:none">
            <li><p>first name: ${fn}</p></li>
            <li><p>last name: ${ln}</p></li>
            <li><p>subject: ${sub}</p></li>
            <li><p>email: ${email}</p></li>
            <li><p>message: ${msg}</p></li>
          </ul>
        `
      });
    }

    res.status(200).json({
      message: 'Success'
    });
  }
});

export default router;
