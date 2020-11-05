const AWS = require('aws-sdk');

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

const getChunks = (arr, size) => {
  const result = [];
  while (arr.length) {
    result.push(arr.splice(0, size));
  }
  return result;
};

exports.exec = async (event) => {
  try {
    const hubs = JSON.parse(event.body);
    const chunkedHubs = getChunks(hubs, 25);

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < chunkedHubs.length; index++) {
      const hubBatch = chunkedHubs[index];

      const requestItems = hubBatch.map(({ url, platform }) => ({
        PutRequest: {
          Item: {
            url,
            platform,
            crawledAt: 0,
          },
        },
      }));
      // eslint-disable-next-line no-await-in-loop
      await client.batchWrite({
        RequestItems: {
          [process.env.HUBS_TABLE]: requestItems,
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
