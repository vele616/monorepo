const AWS = require('aws-sdk');

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const timeframe = 24 * 60 * 60 * 1000;

const lastArchived = 24 * 60 * 60 * 1000;

const client = new AWS.DynamoDB.DocumentClient(options);

exports.exec = async () => {
  const timestamp = new Date().getTime();
  try {
    const result = await client.scan(
      {
        TableName: process.env.URLS_TABLE,
        FilterExpression: 'createdAt > :timestamp AND published = :published OR archivedAt > :archivedAt',
        ExpressionAttributeValues: {
          ':timestamp': timestamp - timeframe,
          ':published': false,
          ':archivedAt': timestamp - lastArchived,
        },
      },
    ).promise();

    const archived = {
      archived: (result.Items).filter((item) => item.archived === true),
      new: (result.Items).filter((item) => item.archived === false),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(archived),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the documents.',
    };
  }
};
