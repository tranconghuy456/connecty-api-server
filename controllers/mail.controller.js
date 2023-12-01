import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import * as ENV from "../configs/root.js";

// init nodemailer transporter
let transporter = nodemailer.createTransport(ENV.ETHEREAL);

// init Mailgen
let mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

const mailer = async (req, res) => {
  try {
    const { username, email, text, subject } = req.body;

    // mail body
    var mail = {
      body: {
        name: username,
        intro: text,
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    // convert to html
    var emailHTML = mailGenerator.generate(mail);
    // send mail
    transporter
      .sendMail({
        // info
        from: ENV.ETHEREAL.auth["user"],
        to: email,
        subject: subject,
        html: emailHTML,
      })
      .then(() => {
        // if success
        return res
          .status(200)
          .json({
            status: "success",
            message: "OK",
            code: 200,
          })
          .catch((error) => {
            throw new Error(error);
          });
      });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      errors: [
        {
          message: "Internal server error",
          code: 500,
          data: error,
        },
      ],
    });
  }
};

export { mailer };
