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
    const { email } = event.pathParameters;
    const emailRecord = await client.query({
      TableName: process.env.NEWSLETTER_TABLE,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    }).promise();

    if (emailRecord.Items.length > 0) {
      await client.update({
        TableName: process.env.NEWSLETTER_TABLE,
        Key: { email },
        UpdateExpression: 'SET deleted = :deleted, deletedAt = :deletedAt ',
        ExpressionAttributeValues: {
          ':deleted': true,
          ':deletedAt': timestamp,
        },
      }).promise();
    }
    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
    };
  }
};
