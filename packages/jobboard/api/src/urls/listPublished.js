const AWS = require("aws-sdk");

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

exports.exec = async () => {
  try {
    const result = await client
      .scan({
        TableName: process.env.URLS_TABLE,
        FilterExpression: "publishedAt > :publishedAt",
        ExpressionAttributeValues: {
          ":publishedAt": 0,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch the documents.",
    };
  }
};
