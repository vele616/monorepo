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
    const { url, host, published } = JSON.parse(event.body);

    if (published) {
      await client.update({
        TableName: process.env.URLS_TABLE,
        Key: { url },
        UpdateExpression: 'set host = :host,  createdAt = if_not_exists(createdAt, :createdAt), updatedAt = :updatedAt, published = :published, publishedAt = :publishedAt, crawlable = if_not_exists(crawlable, :crawlable)',
        ExpressionAttributeValues: {
          ':host': host,
          ':createdAt': timestamp,
          ':updatedAt': timestamp,
          ':publishedAt': timestamp,
          ':published': published,
          ':crawlable': false,
        },
      }).promise();
    } else {
      await client.update({
        TableName: process.env.URLS_TABLE,
        Key: { url },
        UpdateExpression: 'set host = :host,  createdAt = if_not_exists(createdAt, :createdAt), updatedAt = :updatedAt, published = :published, crawlable = if_not_exists(crawlable, :crawlable)',
        ExpressionAttributeValues: {
          ':host': host,
          ':createdAt': timestamp,
          ':updatedAt': timestamp,
          ':published': published,
          ':crawlable': false,
        },
      }).promise();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({}),
    };
  } catch (error) {
    console.warn(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create a new document.',
    };
  }
};
