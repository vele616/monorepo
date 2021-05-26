const getUrls = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return await page.evaluate(() => {
    const companyName = document.querySelector(".Listing-companyName");
    const isFeatured = [
      ...document.querySelectorAll(".Listing-titleAndDate > div"),
    ];
    const urls = [
      ...document.querySelectorAll(".Listing-quickActions > div > a"),
    ]
      .map((url, i) => ({
        url: url.href,
        isFeatured: isFeatured[i].textContent,
      }))
      .filter((p) => p.isFeatured === "Featured")
      .map((t) => t.url);

    return {
      urls,
      companyName: companyName ? companyName.textContent : null,
      logoUrl: null,
      companyWebsite: null,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("h1").textContent,
        content: document
          .querySelector(".RichText")
          .innerHTML.replace(/&nbsp;/g, ""),
        location: document.querySelector(".Listing-location").textContent,
        applyUrl: document.querySelector(".Listing-actions > div > a").href,
        name: document.querySelector(".Listing-companyName").textContent,
      };
    })),
    url,
  };
};

module.exports = { getUrls, getJobs };
