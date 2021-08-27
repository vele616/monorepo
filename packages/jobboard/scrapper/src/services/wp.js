const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);
    const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };

  return await page.evaluate(() => {
    const urls = [
      ...document.querySelectorAll(
        ".Listing--highlightPromotion > .Listing-inner > .Listing-link"
      ),
    ].map((url) => url.href);

    return {
      urls,
      companyName: "wp",
      logoUrl: null,
      companyWebsite: window.location.href,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);
    const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };

  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h1").textContent,
        content: document
          .querySelector(".RichText")
          .innerHTML.replace(/&nbsp;/g, ""),
        location: document.querySelector(".Listing-location").textContent,
        applyUrl: document.querySelector(
          ".Listing-actionItem > .Button.Button--block"
        ).href,
        companyName: document.querySelector(".Listing-companyName").textContent,
      };
    })),
    url,
  };
};

module.exports = { getUrls, getJobs };
