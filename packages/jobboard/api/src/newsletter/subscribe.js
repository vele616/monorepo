const AWS = require('aws-sdk');
const { customAlphabet } = require('nanoid');
const englishLowercase = require('nanoid-dictionary/lowercase');

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
    const { email, confirm } = JSON.parse(event.body);
    const hash = customAlphabet(englishLowercase, 16);
    if (confirm) {
      const emailHash = hash();

      const emailExists = (await client.query({
        TableName: process.env.NEWSLETTER_TABLE,
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email,
        },
      }).promise()).Items.length > 0;

      if (!emailExists) {
        await client.update({
          TableName: process.env.NEWSLETTER_TABLE,
          Key: { email },
          UpdateExpression: 'SET emailHash = :emailHash, confirmed = :confirmed, createdAt = :createdAt, updatedAt = :updatedAt',
          ExpressionAttributeValues: {
            ':emailHash': emailHash,
            ':confirmed': false,
            ':createdAt': timestamp,
            ':updatedAt': timestamp,
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
