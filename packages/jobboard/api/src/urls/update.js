const AWS = require('aws-sdk');

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

exports.exec = async (event) => {
  const timestamp = new Date().getTime();
  try {
    const { urls } = JSON.parse(event.body);
    await Promise.all(urls.map((url) => client.update({
      TableName: process.env.URLS_TABLE,
      Key: { url },
      UpdateExpression: 'set published = :published, updatedAt = :updatedAt, publishedAt = :publishedAt',
      ExpressionAttributeValues: {
        ':published': true,
        ':updatedAt': timestamp,
        ':publishedAt': timestamp,
      },
    }).promise()));

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the document.',
    };
  }
};
