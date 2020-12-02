const AWS = require("aws-sdk");

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

exports.exec = async (event) => {
  const timestamp = new Date().getTime();
  try {
    const { email, hash } = event.pathParameters;
    console.log(email, hash);
    const emailRecord = await client
      .query({
        TableName: process.env.NEWSLETTER_TABLE,
        KeyConditionExpression: "email = :email AND emailHash = :emailHash",
        ExpressionAttributeValues: {
          ":email": email,
          ":emailHash": hash,
        },
      })
      .promise();
    if (
      emailRecord.Items.length > 0 &&
      emailRecord.Items[0].confirmed === false
    ) {
      await client
        .update({
          TableName: process.env.NEWSLETTER_TABLE,
          Key: { email, emailHash: hash },
          UpdateExpression:
            "SET confirmed = :confirmed, updatedAt = :updatedAt",
          ExpressionAttributeValues: {
            ":confirmed": true,
            ":updatedAt": timestamp,
          },
        })
        .promise();
    } else if (
      emailRecord.Items.length > 0 &&
      emailRecord.Items[0].confirmed === true
    ) {
      return {
        statusCode: 301,
        headers: {
          Location: `${process.env.REDIRECT_CONFIRM_URI}already-confirmed`,
        },
      };
    } else {
      return {
        statusCode: 301,
        headers: { Location: `${process.env.REDIRECT_CONFIRM_URI}error` },
      };
    }
    return {
      statusCode: 301,
      headers: { Location: `${process.env.REDIRECT_CONFIRM_URI}success` },
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
    };
  }
};
