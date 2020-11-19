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

    const results = result.Items;

    const group = results.reduce((acc, item) => {
      acc[item.archived] = [...acc[item.archived] || [], item];
      return acc;
    }, {});

    console.log('archived', group);

    return {
      statusCode: 200,
      body: `archived:${JSON.stringify(group)}`,
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
