const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

  await page.goto(url);

  return await page.evaluate(() => {
    const companyName = document.querySelector('[property="og:site_name"]');
    const logoUrl = document.querySelector("#st-companyLogo > img");
    const companyWebsite = document.querySelector("#st-navBar > ul > li > a");

    return {
      urls: [...document.querySelectorAll("section > ul > li> a")].map(
        (i) => i.href
      ),
      companyName: companyName ? companyName.content : undefined,
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h1").textContent,
        content: document
          .querySelector('[itemprop="description"]')
          .innerHTML.replace(/\n/g, "")
          .replace(/<p><strong>(.*?)<\/strong><\/p>/g, "<h2>$1</h2>")
          .replace(/<li><h2>(.*?)<\/h2><\/li>/g, "<li>$1</li>"),
        location: [
          document.querySelector('[itemprop="addressLocality"]'),
          document.querySelector('[itemprop="addressCountry"]'),
        ]
          .map((i) => i.content)
          .toString(),
        applyUrl: document.querySelector("#st-apply").href,
      };
    })),
    url,
  };
};

module.exports = { getUrls, getJobs };
