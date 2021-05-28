const chromium = require("chrome-aws-lambda");
const AWS = require("aws-sdk");
const switchFunc = require("./switch");
const template = require("./toMarkdown");
const rake = require("./rake/index");
const keywords = require("./keywords");
const summarize = require("./summarize");

let timeframe = 23 * 60 * 60 * 1000;

let options = {};

let dbOptions = {};

if (process.env.IS_OFFLINE) {
  timeframe = 5 * 60 * 1000;
}

if (process.env.IS_OFFLINE) {
  options = {
    s3ForcePathStyle: true,
    accessKeyId: "S3RVER",
    secretAccessKey: "S3RVER",
    endpoint: new AWS.Endpoint("http://localhost:8080"),
  };
}

if (process.env.IS_OFFLINE) {
  dbOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

const client = new AWS.DynamoDB.DocumentClient(dbOptions);

const s3 = new AWS.S3(options);

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
    const data = {
      ...event.Records[0],
      dynamodb: {
        ApproximateCreationDateTime:
          event.Records[0].dynamodb.ApproximateCreationDateTime,
        Keys: AWS.DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.Keys),
        NewImage: AWS.DynamoDB.Converter.unmarshall(
          event.Records[0].dynamodb.NewImage
        ),
      },
    };
    const {
      crawlable,
      crawledAt,
      host,
      url,
      platform,
      companyName,
      companyLogo,
      companyWebsite,
      urlHash,
    } = data.dynamodb.NewImage;
    if (
      (data.eventName === "INSERT" || data.eventName === "MODIFY") &&
      crawlable &&
      (!crawledAt || crawledAt + timeframe < timestamp)
    ) {
      const result = await switchFunc(platform, host, browser, url).getJobs();

      const organizationName = result.companyName ? result.companyName : companyName;

      const keywordsData = rake(
        `${result.content}. ${result.title}`
          .replace(/<.*?>|<.*?>|&.*?;/g, " ")
          .replace(/,\w/, ", "),
        keywords
      ).keywords;

      const hashtags = Object.entries(keywordsData)
        .map(([k, v]) => ({
          hashtag: keywords[k].hashtag,
          rating: keywords[k].rating * v,
        }))
        .reduce((a, b) => {
          if (a.length === 10) {
            const max = a.reduce((a, b) => {
              if (a.rating < b.rating) {
                return a;
              } else {
                return b;
              }
            });
            if (max.rating < b.rating) {
              max.hashtag = b.hashtag;
              max.rating = b.rating;
            }
          } else {
            a.push(b);
          }
          return a;
        }, [])
        .sort((a, b) => {
          const ratingA = a.rating;
          const ratingB = b.rating;
          let comparison = 0;
          if (ratingA > ratingB) {
            comparison = -1;
          } else {
            comparison = 1;
          }
          return comparison;
        })
        .map((t) => t.hashtag);
        
      const classification = Object.values(keywords)
        .filter((k) => hashtags.includes(k.hashtag))
        .map((i) => ({ c: i.class, hashtag: i.hashtag }))
        .reduce(
          (acc, t) => {
            const mod = (hashtags.length - hashtags.findIndex(i => i === t.hashtag)) % 3 + 1;
            return {
              software: acc.software + t.c.software * mod,
              other: acc.other + t.c.other * mod,
            };
          },
          { software: 0, other: 0 }
        );

      const jobType =
        classification.software >= classification.other ? "software" : "other";

      const { summary, summaryBackup } = summarize(
        organizationName,
        result.title,
        result.content,
        hashtags
      );

      const file = template(
        result.title,
        result.location || "",
        host,
        result.url,
        result.applyUrl,
        timestamp - (timestamp % 86400000),
        result.content,
        hashtags,
        jobType,
        organizationName || "",
        companyLogo || "",
        companyWebsite || "",
        summary,
        summaryBackup,
      );

      const titleCompany = `${result.title}-${organizationName}`
        .replace(/[^a-z0-9]/gi, "-")
        .replace(/(-)\1+/g, "$1")
        .toLowerCase();

      const markdownKey = `${titleCompany}-${urlHash}.md`;

      await s3
        .putObject({
          Bucket: process.env.MARKDOWN_S3_BUCKET,
          Key: markdownKey,
          Body: file,
        })
        .promise();

      await client
        .update({
          TableName: process.env.URLS_TABLE,
          Key: { url: result.url },
          UpdateExpression:
            "set title = :title, jobPostFilename = :jobPostFilename, titleCompany = :titleCompany, crawledAt = :crawledAt, jobPostMarkdown = :jobPostMarkdown, updatedAt = :updatedAt, hashtags = :hashtags, jobType = :jobType",
          ExpressionAttributeValues: {
            ":updatedAt": timestamp,
            ":crawledAt": timestamp,
            ":hashtags": hashtags,
            ":jobType": jobType,
            ":title": result.title,
            ":titleCompany": titleCompany,
            ":jobPostFilename": markdownKey,
            ":jobPostMarkdown": `${process.env.MARKDOWN_S3_URL}/${markdownKey}`,
          },
        })
        .promise();
    }
    return { event };
  } catch (error) {
    console.warn(error);
    return error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};
