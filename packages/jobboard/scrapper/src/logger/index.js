const fetch = require("node-fetch");

const stringToColour = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

const createPayload = (type, text) => {
  const timestamp = Math.floor(Date.now() / 1000);

  return {
    channel: process.env.SLACK_CHANNEL,
    attachments: [
      {
        title: `<!date^${timestamp}^{date} at {time}| ${new Date()}> ➡️ ${type}`,
        text: text,
        author_name: "CroCoder Jobs Scrapper",
        color: stringToColour(timestamp),
      },
    ],
  };
};

const log = async (type, text) => {
  const payload = createPayload(type, text);

  if (process.env.IS_OFFLINE) {
    console.log(payload);
  } else {
    try {
      await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": payload.length,
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          Accept: "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = log;
