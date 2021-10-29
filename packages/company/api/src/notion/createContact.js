const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const getMentions = () => {
  const emails = process.env.MENTION_EMAILS.split(",");
  const ids = process.env.MENTION_IDS.split(",");

  return ids.map((id, i) => {
    return {
      id,
      email: emails[i],
    };
  });
};

const mentionPeople = () => {
  return getMentions().flatMap(mentionPerson);
};

const mentionPerson = ({ id, email }) => {
  return [
    {
      type: "mention",
      mention: {
        type: "user",
        user: {
          object: "user",
          id: id,
          type: "person",
          person: {
            email: email,
          },
        },
      },
      plain_text: "",
      href: null,
    },
    {
      type: "text",
      text: {
        content: " ",
      },
    },
  ];
};

const createContactObject = (id, email, name, content) => {
  return {
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      id: {
        title: [
          {
            text: {
              content: id,
            },
          },
        ],
      },
      email: {
        email: email,
      },
      name: {
        rich_text: [
          {
            type: "text",
            text: {
              content: name,
            },
          },
        ],
      },
      date: {
        date: {
          start: new Date(),
        },
      },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content: content,
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: mentionPeople(),
        },
      },
    ],
  };
};

const createContact = async (id, email, name, content) => {
  try {
    const response = await notion.pages.create(
      createContactObject(id, email, name, content)
    );
    console.log(response);
    return response.url;
  } catch (err) {
    throw err;
  }
};

module.exports = createContact;
