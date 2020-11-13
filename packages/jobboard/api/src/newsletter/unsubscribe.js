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
    const emailRecord = await client
      .query({
        TableName: process.env.NEWSLETTER_TABLE,
        KeyConditionExpression: 'email = :email AND emailHash = :emailHash',
        ExpressionAttributeValues: {
          ':email': email,
          ':emailHash': hash,
        },
      })
      .promise();

    if (emailRecord.Items.length > 0) {
      await client
        .delete({
          TableName: process.env.NEWSLETTER_TABLE,
          Key: { email, emailHash: hash },
        })
        .promise();
    } else {
      return {
        statusCode: 301,
        headers: { Location: `${process.env.REDIRECT_UNSUBSCRIBE_URI}?response=ERROR` },
      };
    }

    return {
      statusCode: 301,
      headers: { Location: `${process.env.REDIRECT_UNSUBSCRIBE_URI}?response=SUCCESS` },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
    };
  }
};
