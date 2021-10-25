const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const verify = require("../recaptcha/verify");

let databaseOptions = {};

if (process.env.IS_OFFLINE) {
  databaseOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const client = new AWS.DynamoDB.DocumentClient(databaseOptions);

const sqs = new AWS.SQS();

exports.exec = async (event, context) => {
  const timestamp = new Date().getTime();
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "No body was found",
        }),
      };
    }

    const { email, name, message, token } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 403,
      };
    }

    const region = context.invokedFunctionArn.split(":")[3];
    const accountId = context.invokedFunctionArn.split(":")[4];
    const queueUrl = `https://sqs.${region}.amazonaws.com/${accountId}/${process.env.CONTACT_SQS}`;
    const id = nanoid();

    await client
      .update({
        TableName: process.env.CONTACT_TABLE,
        Key: { id },
        UpdateExpression:
          "SET email = :email, contactName = :name, message = :message, createdAt = :createdAt, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":email": email,
          ":name": name,
          ":message": message,
          ":createdAt": timestamp,
          ":updatedAt": timestamp,
        },
      })
      .promise();

    await sqs
      .sendMessage({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify({ id, email, name, message }),
      })
      .promise();

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Something went wrong.",
    };
  }
};
