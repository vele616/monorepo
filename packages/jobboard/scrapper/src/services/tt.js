const createPage = require("../page/createPageWithInterceptor");

const remoteWords = require("../remoteWords");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);
    const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };

  return await page.evaluate((remoteWords) => {
    const companyWebsite = document.querySelector("a.website");
    const logoUrl = document.querySelector("#header > a > img");
    const isRemote = [...document.querySelectorAll("div.job-metrics > div")];
    const urls = [
      ...document.querySelectorAll("div.job-listing-container > ul > li > a"),
    ]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) =>
        new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
      )
      .map((t) => t.url);

    return {
      urls,
      companyName: document
        .querySelector("#header > a > img")
        .getAttribute("alt"),
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
      const location1 = document.querySelector(".remote-status");

      const parent = document.querySelector(".body");
      parent.removeChild(document.querySelector("p:first-child"));

      return {
        title: document.querySelector("h1").textContent,
        content: parent.innerHTML
          .replace(/<p><strong>(.*?)<\/strong><\/p>/g, "<h2>$1</h2>")
          .replace(/\n|<br>/g, "")
          .replace(/(<strong>|<\/strong>)/g, ""),
        location: location1
          ? location1.textContent.replace(/.+?(?=remote)/i, "").trim()
          : null,
      };
    })),
    url,
    applyUrl: `${url}/applications/new?`,
  };
};

module.exports = { getUrls, getJobs };
