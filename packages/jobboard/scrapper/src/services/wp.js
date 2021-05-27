const getUrls = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return await page.evaluate(() => {
    const companyName = document.querySelector(".Listing-companyName");

    const urls = [...document.querySelectorAll(".Listing--highlightPromotion")].map(
      (url) => (url = url.querySelector(".Listing-link").href)
    );

    return {
      urls,
      companyName: companyName ? companyName.textContent : null,
      logoUrl: null,
      companyWebsite: null,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h1").textContent,
        content: document
          .querySelector(".RichText")
          .innerHTML.replace(/&nbsp;/g, ""),
        location: document.querySelector(".Listing-location").textContent,
        applyUrl: document.querySelector(".Listing-actionItem").children[0].href,
        companyName: document.querySelector(".Listing-companyName").textContent,
      };
    })),
    url,
  };
};

module.exports = { getUrls, getJobs };
