const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

  const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };

  return await page.evaluate((remoteWords) => {
    const logoUrl = document.querySelector(".brand-logo > img");
    const companyWebsite = document.querySelector(".jobs-navbar > div > a");
    const urls = [...document.querySelectorAll(".list-group-item")]
      .map((el) => {
        const remote = el.querySelector("h4 > a");
        const url = el.querySelector("h4 > a");
        return {
          isRemote: remote ? remote.textContent : null,
          url: url.href,
        };
      })
      .filter((t) =>
        new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
      )
      .map((t) => t.url);

    return {
      urls,
      companyName: document
        .querySelector('[property="og:title"]')
        .getAttribute("content")
        .replace(" - Career Page", ""),
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite ? companyWebsite.href : null,
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
      const avgLength = [
        ...document.querySelector(".description").querySelectorAll("p"),
      ]
        .map((p) => p.textContent.length)
        .filter((l) => l > 1)
        .reduce((acc, l, i, src) => acc + l / src.length, 0);

      const content = [...document.querySelector(".description").children]
        .map((i) => {
          if (i.localName === "h2") {
            return `<h2>${i.textContent}</h2>`;
          } else if (
            i.localName === "p" &&
            i.textContent.length < avgLength / 3
          ) {
            return `<h2>${i.textContent}</h2>`;
          } else if (i.localName === "ul" || i.localName === "ol") {
            return i.innerHTML;
          } else {
            return `<p>${i.textContent}</p>`;
          }
        })
        .join("");

      return {
        title: document.querySelector(".job-header > div > h1").textContent,
        content: content,
        location: document.querySelector('[title="Location"]').textContent,
      };
    })),
    url,
    applyUrl: url,
  };
};

module.exports = { getUrls, getJobs };
