const remoteWords = require("../remoteWords");

const getUrls = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

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
      companyWebsite: companyWebsite ? companyWebsite.href : window.location.href,
    };
  }, remoteWords);
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
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
          .replace(/\n|<br>/g, "")
          .replace(/h3|h1/g, "h2")
          .replace(/<(p|h2|span)[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/strong><\/(p|h2|span)>/g, "<h2>$1</h2>"),
        location: location1 ? location1.textContent.trim() : null,
      };
    })),
    url,
    applyUrl: `${url}/c/new`,
  };
};

module.exports = { getUrls, getJobs };
