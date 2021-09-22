const fetch = require("node-fetch");

const createPayload = (name, email, url) => ({
  channel: process.env.SLACK_CHANNEL,
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "We have 1 new message(s).",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `We got a new message from _${name}_ (_${email}_).`,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: " ",
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Show me the message",
          emoji: true,
        },
        value: "new_message_click",
        url: url,
        action_id: "button-action",
      },
    },
  ],
});

const notifyContactCreated = async (name, email, url) => {
  const payload = createPayload(name, email, url);

  if (process.env.IS_OFFLINE) {
    console.log(payload);
  } else {
    try {
      const result = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": payload.length,
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          Accept: "application/json",
        },
      });
      console.log(result.status);
      console.log(await result.json());
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = notifyContactCreated;
