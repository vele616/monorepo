const AWS = require("aws-sdk");

let dbOptions = {};
let options = {};

if (process.env.IS_OFFLINE) {
  dbOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

if (process.env.IS_OFFLINE) {
  options = {
    endpoint: 'http://127.0.0.1:4010',
    accessKeyId: "YOURKEY",
    secretAccessKey: "YOURSECRET",
    region: "localhost"
  };
}

const client = new AWS.DynamoDB.DocumentClient(dbOptions);

const eventBridge = new AWS.EventBridge(options);

exports.exec = async () => {
  try {
    const timestamp = new Date().getTime();

    const result = await client.scan(
      {
        TableName: process.env.HUBS_TABLE,
        FilterExpression: 'crawledAt < :timestamp',
        ExpressionAttributeValues: {
          ":timestamp": timestamp - 24 * 60 * 60 * 1000,
        }
      },
    ).promise();

    const hubs = result.Items.slice(0, 5).map(t => ({ url: t.url, platform: t.platform }));

    if (hubs.length > 0) {

      await Promise.all(hubs.map(({ url, platform }) => eventBridge.putEvents({
        Entries: [
          {
            EventBusName: 'jobboard',
            Source: 'hub.crawl',
            DetailType: 'request',
            Detail: JSON.stringify({ url, platform }),
          },
        ]
      }).promise()));

      const requestItems = hubs.map(({ url, platform }) => ({
        PutRequest: {
          Item: {
            url,
            platform: platform,
            crawledAt: timestamp,
          },
        }
      }));
      await client.batchWrite({
        RequestItems: {
          [process.env.HUBS_TABLE]: requestItems,
        },
      }).promise();
    }
  } catch (error) {
    console.warn(error);
    return error;
  } finally {
  }
};
