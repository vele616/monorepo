const remoteWords = require("../remoteWords");
const puppeteer = require("puppeteer");

const getUrls = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage();
  await page.goto(url);

/*
  let previousHeight;
  while (true) {
    try {
      previousHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitForFunction(
        `document.body.scrollHeight > ${previousHeight}`
      );
    } catch (e) {
      console.log("Scroll End Page");
      break;
    }
  }
  */

  const jobPost = await page.evaluate(() =>
    [
      ...document.querySelectorAll(
        "#__next > div > div:nth-child(14) > div > div:nth-child(2) > div"
      ),
    ].map((el) => {
      const companyName = el.querySelector(".Listing-companyName").textContent;
      const content = el.querySelector('.Listing-description > div > div').textContent;
      const url = el.querySelector('div > a').href;
      const isRemote = el.querySelector('.Listing-location').textContent;
      const isFeatured = el.querySelector('.Listing-titleAndDate > div').textContent
      return {
        companyName,
        content,
        url,
        isRemote,
        isFeatured,
      };
    })
  );

  console.log(jobPost)

  await browser.close();
};

getUrls(process.argv[2]);
