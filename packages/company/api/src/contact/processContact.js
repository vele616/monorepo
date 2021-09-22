const createContact = require("../notion/createContact");
const notifyContactCreated = require("../slack/notifyContactCreated");

exports.exec = async (event) => {
  try {
    for (const record of event.Records) {
      const { email, name, message } = JSON.parse(record.body);

      if (email || name || message) {
        console.log(message);
        throw new Error("Missing email, name or message");
      }

      const url = await createContact(
        `Message from ${name}`,
        email,
        name,
        message
      );
      await notifyContactCreated(name, email, url);
    }
  } catch (error) {
    console.log(error);
  }
};
