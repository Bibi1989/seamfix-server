"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid = require("nodemailer-sendgrid");
exports.sendMail = (email, message, subject) => {
    // let transporter: any = nodemailer.createTransport(
    //   nodemailer_sendgrid({
    //     apiKey: process.env.SENDGRID_API_KEY,
    //   })
    // );
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_MAIL_AUTH,
            pass: process.env.PASSWORD_MAIL_AUTH,
        },
    });
    const mailOptions = {
        from: "bmanagerapp@gmail.com",
        to: email,
        subject,
        text: message,
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent!!!" + data);
        }
    });
};
//# sourceMappingURL=mail.js.map