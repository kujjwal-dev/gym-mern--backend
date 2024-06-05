import nodeMailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

const handlebarsOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: './emailTemplate',
    defaultLayout: false,
  },
  viewPath: './emailTemplate',
  extName: ".handlebars"

}

transporter.use('compile', hbs(handlebarsOptions));

export const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    template: 'email',
   context,
  };
  await transporter.sendMail(mailOptions);
};