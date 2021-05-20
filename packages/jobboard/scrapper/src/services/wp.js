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
  const postUrls = await page.evaluate(() =>
    [...document.querySelectorAll(".Listing.Listing")]
      .map((el) => {
        const companyName = el.querySelector(".Listing-companyName")
          .textContent;
        const isFeatured = el.querySelector(".Listing-titleAndDate > div")
          .textContent;
        const url = el.querySelector("div > a").href;
        return {
          companyName,
          url,
          isFeatured,
          logoUrl: undefined,
          companyWebsite: undefined,
        };
      })
      .filter((p) => p.isFeatured === "Featured")
      .map((t) => t.url)
  );

  console.log(postUrls);
  await browser.close();
};

//getUrls(process.argv[2]);

const getJobs = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage();
  await page.goto(url);

  const jobPost = await page.evaluate(() => {
    return {
      //url,
      title: document.querySelector("h1").textContent,
      content: document.querySelector(".RichText").innerHTML.replace(/&nbsp;/g, ""),
      location: document.querySelector(".Listing-location").textContent,
      applyUrl: document.querySelector(".Listing-actions > div > a").href,
    };
  });
  console.log(jobPost);
  await browser.close();
};

getJobs(process.argv[2]);
