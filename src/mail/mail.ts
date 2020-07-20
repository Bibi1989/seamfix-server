import nodemailer from "nodemailer";
const nodemailer_sendgrid = require("nodemailer-sendgrid");

export const sendMail = (email: string, message: string, subject: string) => {
  // let transporter: any = nodemailer.createTransport(
  //   nodemailer_sendgrid({
  //     apiKey: process.env.SENDGRID_API_KEY,
  //   })
  // );
  let transporter: any = nodemailer.createTransport({
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

  transporter.sendMail(mailOptions, (err: Error, data: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent!!!" + data);
    }
  });
};
