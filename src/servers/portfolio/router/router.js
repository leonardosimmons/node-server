"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendGridTransport = require('nodemailer-sendgrid-transport');
const { EMAIL_API_KEY, EMAIL_SENDER } = process.env;
const router = express_1.default.Router();
const transporter = nodemailer_1.default.createTransport(sendGridTransport({
    auth: {
        api_key: EMAIL_API_KEY
    }
}));
router.use('/contact-me-form-submit', (req, res, next) => {
    if (req.body) {
        const fn = req.body.firstname;
        const ln = req.body.lastname;
        const sub = req.body.subject;
        const email = req.body.email;
        const msg = req.body.message;
        if (msg) {
            transporter.sendMail({
                to: EMAIL_SENDER,
                from: EMAIL_SENDER,
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
exports.default = router;
//# sourceMappingURL=router.js.map