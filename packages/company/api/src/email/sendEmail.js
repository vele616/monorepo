const AWS = require("aws-sdk");
const { subject, html } = require("../../emails/contact");

const emailService = new AWS.SES({ apiVersion: "2010-12-01" });

const sendEmail = async (notionUrl, message, name, email) => {
  const params = {
    Destination: {
      ToAddresses: [...process.env.EMAILS.split(",")],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html(notionUrl, email, name, message),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject(name, email),
      },
    },
    Source: "hello@crocoder.dev",
  };

  await emailService.sendEmail(params).promise();
};

module.exports = sendEmail;
