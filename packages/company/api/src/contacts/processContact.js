const createContact = require("../notion/createContact");
const notifyContactCreated = require("../slack/notifyContactCreated");
const sendEmail = require("../email/sendEmail.js");

exports.exec = async (event) => {
  try {
    for (const record of event.Records) {
      const { id, email, name, message } = JSON.parse(record.body);

      console.log(id, email, name, message);

      if (!id || !email || !name || !message) {
        throw new Error("Missing id, email, name or message");
      }

      const url = await createContact(
        `Message from ${name} (${id})`,
        email,
        name,
        message
      );
      await notifyContactCreated(name, email, url);
      await sendEmail(url, message, name, email);
    }
  } catch (error) {
    console.log(error);
  }
};
