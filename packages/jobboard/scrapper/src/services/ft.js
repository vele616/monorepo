const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => ({
    urls: [...document.querySelectorAll("a.job-title")].map(
      (item) => item.href
    ),
    companyName: document
      .querySelector('[property="og:title"]')
      .content.replace("Careers - ", ""),
    logoUrl: document.querySelector(".portal-img > img").src,
    companyWebsite: document.querySelector('[class="navbar-brand"]').href,
  }));
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h1").textContent,
        content: document
          .querySelector('[class="job-details-content content"] > div')
          .innerHTML.replace(/h4/g, "h2")
          .replace(/<br>/g, "")
          .replace(
            /<p[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/p>/g,
            "<p><h2>$1</h2></p>"
          )
          .replace(/strong/g, "span"),
        location: document
          .querySelector(".col-xs-8 > div")
          .textContent.trim()
          .replace(/\|.*$/g, ""),
      };
    })),
    url,
    applyUrl: `${url}#applicant-form`,
  };
};

module.exports = { getUrls, getJobs };
