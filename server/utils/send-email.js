import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // NM -> NODE-MAILER

    // host: process.env.NM_HOST,
    // port: process.env.NM_PORT,
    service: process.env.NM_SERVICE,
    auth: {
      user: process.env.NM_MAIL,
      pass: process.env.NM_PASS,
    },
    // to get google app password -
    // google account -> security -> set 2 step verfication -> app password -> select app (custom name-nodemailer)
  });

  const mailOptions = {
    from: process.env.NM_MAIL,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
