const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f3935054997845",
      pass: "b684d170ea3c78",
    },
  });

  transport.sendMail(data, (err, info) => {
    if (err) {
    } else {
      return info.response;
    }
  });
};

module.exports = { sendEmail };
