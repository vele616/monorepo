const remoteWords = require("../remoteWords");

const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate((remoteWords) => {
    const companyName = document.querySelector('[property="og:title"]');
    const logoUrl = document.querySelector('.hide-sm-block > img');
    const companyWebsite = document.querySelector('footer > div > div > div > div > div > a');
    const isRemote = [...document.querySelectorAll('div.rt-tbody > div > div > div:nth-child(3)')];
    const urls = [...document.querySelectorAll('div.rt-tbody > div > div > div > div > a.hide-at-sm-block.text-bold')]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => new RegExp(`${remoteWords.join('|')}`, 'gi').test(t.isRemote)) 
      .map((t) => t.url);

    return {
      urls,
      companyName: companyName
        ? companyName.content.replace("Careers at ", "")
        : undefined,
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  },remoteWords);
};
///
const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return {
    ...(await page.evaluate(() => {
      const parent = document.querySelector("body > div.external-content > div.external-content-wrap.external-2-col > main > section > div > div:nth-child(2)");
      parent.removeChild(document.querySelector('body > div.external-content > div.external-content-wrap.external-2-col > main > section > div > div:nth-child(2) > dl'));

      return {
        title: document.querySelector("header > h1").textContent,
        content: parent.innerHTML,
        location: document.querySelector("sidebar > section > div > div > div > div > dl > dd:nth-child(6)").textContent,
      };
    })),
    url,
    applyUrl: `${url}/applications/new`,
  };
};

module.exports = { getUrls, getJobs };
