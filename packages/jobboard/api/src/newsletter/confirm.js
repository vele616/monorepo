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
  try {
    const { email, hash } = event.pathParameters;
    const emailRecord = await client.query({
      TableName: process.env.NEWSLETTER_TABLE,
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    }).promise();
    if (emailRecord.Items.length > 0) {
      const { emailHash } = emailRecord.Items[0];
      if (emailHash === hash) {
        await client.update({
          TableName: process.env.NEWSLETTER_TABLE,
          Key: { email },
          UpdateExpression: 'SET confirmed = :confirmed',
          ExpressionAttributeValues: {
            ':confirmed': true,
          },
        }).promise();
      }
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
