const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

    const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };

  return await page.evaluate((remoteWords) => {
    const logoUrl = document.querySelector(".header-main-logo > img");
    const companyWebsite = document.querySelector(".header-main-link");
    const urls = [...document.querySelectorAll(".js-card")]
      .map((el) => {
        const remote = el.querySelector(".col-md-4");
        const url = el.querySelector("a");
        return {
          url: url.href,
          isRemote: remote ? remote.textContent : null,
        };
      })
      .filter((t) =>
        new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
      )
      .map((t) => t.url);

    return {
      urls,
      companyName: document
        .querySelector(".company-header-title")
        .textContent.replace("Jobs at", ""),
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  }, remoteWords);
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
        title: document.querySelector(".js-job-title").textContent.trim(),
        content: document
          .querySelector(".jobdesciption")
          .innerHTML.replace(/h3/g, "h2")
          .replace(/h4/g, "h2")
          .replace(/&nbsp;/g, "")
          .replace(
            /<p[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/p>/g,
            "<p><h2>$1</h2></p>"
          )
          .replace(
            /<div[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/div>/g,
            "<div><h2>$1</h2></div>"
          )
          .replace(/strong/g, "a"),
        location: [
          ...document
            .querySelector("header > p.opening-info")
            .querySelectorAll("span"),
        ]
          .filter((span) => span.className)
          .map((span) => span.textContent)
          .join(),
      };
    })),
    url,
    applyUrl: `${url}?apply=true`,
  };
};

module.exports = { getUrls, getJobs };
