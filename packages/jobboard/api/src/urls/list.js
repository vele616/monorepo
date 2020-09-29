const AWS = require('aws-sdk');

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const timeframe = 24 * 60 * 60 * 1000;

const client = new AWS.DynamoDB.DocumentClient(options);

exports.exec = async () => {
  const timestamp = new Date().getTime();
  try {
    const result = await client.scan(
      {
        TableName: process.env.URLS_TABLE,
        FilterExpression: 'createdAt > :timestamp AND published = :published',
        ExpressionAttributeValues: {
          ':timestamp': timestamp - timeframe,
          ':published': false,
        },
      },
    ).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
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
