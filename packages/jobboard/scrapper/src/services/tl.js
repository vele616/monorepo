const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

  await page.goto(url);

  return await page.evaluate(() => ({
    urls: [...document.querySelectorAll("a.job")].map((item) => item.href),
    companyName: document.querySelector('head > meta[property="og:site_name"]')
      .content,
    logoUrl: document.querySelector("div.brand > a > img").src,
    companyWebsite: document.querySelector("div > ul> li:last-child > a").href,
  }));
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      const parent = document.querySelector(
        "div > div > div.col-md-8.col-sm-12.col-xs-12 > div.description.textColor"
      );
      parent.removeChild(
        document.querySelector(
          "div > div > div.col-md-8.col-sm-12.col-xs-12 > div.description.textColor > p:last-child"
        )
      );

      return {
        title: document.querySelector("h1").textContent,
        content: parent.innerHTML
          .replace(/<br>/g, "")
          .replace(/h4/g, "div")
          .replace(/h5/g, "div")
          .replace(/h3/g, "h2")
          .replace(
            /<p[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/p>/g,
            "<p><h2>$1</h2></p>"
          ),
        location: document.querySelector("h2").textContent,
      };
    })),
    url,
    applyUrl: `${url}/new`,
  };
};

module.exports = { getUrls, getJobs };
