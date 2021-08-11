const AWS = require("aws-sdk");

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

const oldTimespan = 60 * 24 * 60 * 60 * 1000;

exports.exec = async () => {
  const timestamp = new Date().getTime();
  try {
    const { Items } = await client
      .scan({
        TableName: process.env.URLS_TABLE,
        FilterExpression: "createdAt < :createdAt AND archived = :archived",
        ExpressionAttributeValues: {
          ":archived": false,
          ":createdAt": timestamp - oldTimespan,
        },
      })
      .promise();

    await Promise.all(
      Items.map((t) => t.url).map((url) =>
        client
          .update({
            TableName: process.env.URLS_TABLE,
            Key: { url },
            UpdateExpression:
              "set archived = :archived, archivedAt = :archivedAt",
            ExpressionAttributeValues: {
              ":archived": true,
              ":archivedAt": timestamp,
            },
          })
          .promise()
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't update the document.",
    };
  }
};
