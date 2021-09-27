const createContact = require("../notion/createContact");
const notifyContactCreated = require("../slack/notifyContactCreated");

exports.exec = async (event) => {
  try {
    for (const record of event.Records) {
      const { id, email, name, message } = JSON.parse(record.body);

      if (!id || !email || !name || !message) {
        throw new Error("Missing id, email, name or message");
      }

      const url = await createContact(
        `Message from ${name} (${id})`,
        email,
        name,
        JSON.parse(message)
      );
      await notifyContactCreated(name, email, url);
    }
  } catch (error) {
    console.log(error);
  }
};
