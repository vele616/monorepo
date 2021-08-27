const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);
    const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };

  return await page.evaluate((remoteWords) => {
    const companyWebsite = document.querySelector("a.company-link");
    const logoUrl = document.querySelector("a > img");
    const isRemote = [...document.querySelectorAll(".job-location")];
    const urls = [...document.querySelectorAll(".job > div > div > a")]
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
    const { status } = await page.goto(url);
  if (status >= 400) {
    throw new Error(`Received ${status} code while scrapping URL: ${url}`)
  };
  return {
    ...(await page.evaluate(() => {
      const parent = document.querySelector("div > div > div > div.content");
      parent.removeChild(
        document.querySelector("div > div > div > div.content > .title")
      );
      parent.removeChild(
        document.querySelector("div > div > div > div.content > div:last-child")
      );
      const location1 = document.querySelector(".info > ul > li:last-child");

      return {
        title: document.querySelector(".info > h2").textContent.trim(),
        content: parent.innerHTML
          .replace(/\n|&nbsp;|<br>/g, "")
          .replace(/h3|h1/g, "h2")
          .replace(
            /<strong[a-zA-Z-=0-9":;\. ]*><span[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/span><\/strong>/g,
            "<h2>$1</h2>"
          )
          .replace(
            /<(span|h2|p)[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/strong><\/(span|h2|p)>/g,
            "<h2>$2</h2>"
          )
          .replace(
            /<(h2|span|strong)[a-zA-Z-=0-9":;\. ]*><(span|a)[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/(span|a)><\/(h2|span|strong)>/g,
            "<p>$3</p>"
          ),
        location: location1 ? location1.textContent.trim() : null,
      };
    })),
    url,
    applyUrl: `${url}/c/new`,
  };
};

module.exports = { getUrls, getJobs };
