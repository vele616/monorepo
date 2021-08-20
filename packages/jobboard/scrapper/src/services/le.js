const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

  await page.goto(url);

  return await page.evaluate((remoteWords) => {
    const urls = [...document.querySelectorAll(".posting")]
      .map((el) => {
        const remote = el.querySelector(".posting-categories");
        const url = el.querySelector("a");
        return {
          isRemote: remote ? remote.textContent : null,
          url: url.href,
        };
      })
      .filter((t) =>
        new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
      )
      .map((t) => t.url);
    const companyWebsite = document.querySelector("body > div > div > p > a");
    return {
      urls,
      companyName: document.querySelector("head > title").textContent,
      logoUrl: document.querySelector("div.page.list > div > div > a > img")
        .src,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  }, remoteWords);
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h2").textContent,
        content: [
          ...document.querySelectorAll('div[class="section page-centered"]'),
        ]
          .map((item) =>
            item.innerHTML.replace(/h3/g, "h2").replace(/<br>/g, "")
          )
          .join("\n"),
        location: document
          .querySelector(
            "div.sort-by-time.posting-category.medium-category-label"
          )
          .textContent.replace(/([ /])/g, ""),
      };
    })),
    url,
    applyUrl: `${url}/apply`,
  };
};

module.exports = { getUrls, getJobs };
