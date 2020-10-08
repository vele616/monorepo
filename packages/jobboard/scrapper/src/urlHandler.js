const chromium = require("chrome-aws-lambda");
const AWS = require("aws-sdk");
const switchFunc = require("./switch");
const fetch = require("node-fetch");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "ModuleSymbhasOwnPrABCDEFGHNRVfgctiUvzKqYTJkLxpZXIjQW",
  5
);

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    s3ForcePathStyle: true,
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
    endpoint: new AWS.Endpoint("http://localhost:8080"),
  };
}

let dbOptions = {};

if (process.env.IS_OFFLINE) {
  dbOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const s3 = new AWS.S3(options);

const client = new AWS.DynamoDB.DocumentClient(dbOptions);

exports.exec = async (event) => {
  let browser = null;
  const timestamp = new Date().getTime();
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const { urls, companyName, logoUrl, companyWebsite } = await switchFunc(
      event.platform,
      event.url,
      browser
    ).getUrls();

    let logoKey = null;

    if (logoUrl) {
      logoKey = `${companyName.trim()}`
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/(-)\1+/g, "$1")
        .toLowerCase();

      try {
        await s3
          .getObject({
            Bucket: process.env.LOGOS_S3_BUCKET,
            Key: logoKey,
            Range: "bytes=0-9",
          })
          .promise();
      } catch (error) {
        const img = await fetch(logoUrl);
        await s3
          .putObject({
            Bucket: process.env.LOGOS_S3_BUCKET,
            Key: logoKey,
            Body: await img.buffer(),
          })
          .promise();
      }
    }

    const result = await Promise.all(
      urls.map((url) => {
        client
          .update({
            TableName: process.env.URLS_TABLE,
            Key: { url },
            UpdateExpression:
              "set host = :host, archived = :archived, platform = :platform, companyLogo = :companyLogo, companyName = :companyName, companyWebsite = :companyWebsite, createdAt = if_not_exists(createdAt, :createdAt), updatedAt = :updatedAt, published = if_not_exists(published, :published), crawlable = :crawlable, urlHash = :urlHash",
            ExpressionAttributeValues: {
              ":companyName": companyName,
              ":host": event.url,
              ":createdAt": timestamp,
              ":updatedAt": timestamp,
              ":published": false,
              ":crawlable": true,
              ":archived": false,
              ":companyLogo": `${process.env.LOGOS_S3_URL}/${logoKey}`,
              ":urlHash": nanoid(),
              ":companyWebsite": companyWebsite,
              ":platform": event.platform,
            },
          })
          .promise();
      })
    );
  } catch (error) {
    console.warn(error);
    return error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
