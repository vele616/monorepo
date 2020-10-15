const remoteWords = require("../remoteWords");

const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate((remoteWords) => {
    const isRemote = [...document.querySelectorAll(".careers-location")];
    const urls = [...document.querySelectorAll("a.gohire-job")]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => new RegExp(`${remoteWords.join('|')}`, 'gi').test(t.isRemote))
      .map((t) => t.url);

    return {
      urls,
      companyName: window.location.pathname
        .replace(/\-.*$/g, "")
        .replace(/\//g, ""),
      logoUrl: document.querySelector("a.client_logo > img").src,
      companyWebsite: document.querySelector("a.client_logo").href,
    };
  }, remoteWords);
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h2").textContent,
        content: document
          .querySelector(".jp-text > div")
          .innerHTML.replace(/h1/g, "h2")
          .replace(/<br>/g, ""),
        location: document.querySelector(".sub-title > p").textContent,
      };
    })),
    url,
    applyUrl: url,
  };
};

module.exports = { getUrls, getJobs };
