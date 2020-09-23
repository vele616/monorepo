const getUrls = async (browser, url) => {

  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => ({
    urls: [...document.querySelectorAll('div.postings-wrapper > div > div > a')].map(item => item.href),
    companyName: document.querySelector('head > title').textContent,
    logoUrl: document.querySelector('div.page.list > div > div > a > img').src,
    companyWebsite: document.querySelector('body > div > div > p > a').href,
  }));
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...await page.evaluate(() => {

      return {
        title: document.querySelector('h2').textContent,
        content: [...document.querySelectorAll('div[class="section page-centered"]')].map(item => item.innerHTML.replace(/h3/g, 'h2').replace(/<br>/g, '')).join("\n"),
        location: document.querySelector('div.sort-by-time.posting-category.medium-category-label').textContent.replace(/([ /])/g, ''),
      }
    }),
    url,
    applyUrl: `${url}/apply`,
  };
};

module.exports = { getUrls, getJobs };