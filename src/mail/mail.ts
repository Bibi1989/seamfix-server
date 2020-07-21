import nodemailer from "nodemailer";

export const sendEmail = async (options: {
  [key: string]: string | number | boolean;
}) => {
  try {
    const { email, subject, message, resetUrl } = options;
    console.log(options);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    } as any);

    let message_info: any = {
      from: `${process.env.FROM_NAME} ${process.env.FROM_EMAIL}`, // sender address
      to: email,
      subject,
      html: `${message}`,
    };

    const info = await transporter.sendMail(message_info);

    return info;
  } catch (error) {
    throw error;
  }
};
