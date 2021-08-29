const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

  const response = await page.goto(url);

  if (response.status() >= 400) {
    throw new Error(
      `Received ${response.status()} code while scrapping URL: ${url}`
    );
  }

  return await page.evaluate((remoteWords) => {
    const companyWebsite = document.querySelector(".company-site > a");
    const logoUrl = document.querySelector("figure > img");
    const isRemote = [
      ...document.querySelectorAll("[data-job-list-items] > a > div > div"),
    ];
    const urls = [...document.querySelectorAll("[data-job-list-items] > a")]

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
        .querySelector('[property="og:site_name"]')
        .getAttribute("content"),
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  }, remoteWords);
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);

  const response = await page.goto(url);

  if (response.status() >= 400) {
    throw new Error(
      `Received ${response.status()} code while scrapping URL: ${url}`
    );
  }

  return {
    ...(await page.evaluate(() => {
      const location1 = document.querySelector(".info > ul > li:last-child");

      return {
        title: document.querySelector("h1 > span").textContent,
        content: [
          ...document.querySelectorAll(
            "div.article[data-medium-editor-element]"
          ),
        ]
          .map((el) => el.innerHTML)
          .join(" ")
          .replace(/h1/g, "h2")
          .replace(/\n|<br>/g, "")
          .replace(/<b[a-zA-Z-=0-9":;\. ]*>(.*?)<\/b>/g, "<span>$1</span>"),
        location: location1
          ? location1.textContent.replace(/.+?(?=remote)/i, "").trim()
          : null,
      };
    })),
    url,
    applyUrl: `${url}/apply?&step=1`,
  };
};

module.exports = { getUrls, getJobs };
