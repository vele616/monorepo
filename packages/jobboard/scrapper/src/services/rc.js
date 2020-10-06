const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => {
    const logoUrl = document.querySelector("a > img");
    const isRemote = [...document.querySelectorAll(".job-location")];
    const urls = [...document.querySelectorAll(".job > div > div > a")]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => /(remote)/gi.test(t.isRemote))
      .map((t) => t.url);

    return {
      urls,
      companyName: document
        .querySelector('[property="og:site_name"]')
        .getAttribute("content"),
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: document.querySelector("a.company-link").href,
    };
  });
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
      const location = document.querySelector(".info > ul > li:last-child");

      return {
        title: document.querySelector(".info > h2").textContent,
        content: parent.innerHTML
          .replace(/<br>/g, "")
          .replace(/h3/g, "h2")
          .replace(
            /<strong[a-zA-Z-=0-9":;\. ]*><em[a-zA-Z-=0-9":;\. ]*>(.*?)<\/em><\/strong>/g,
            "<a><a>$1</a></a>"
          )
          .replace(/strong/g, "h2"),
        location: location ? location.textContent.trim() : null,
      };
    })),
    url,
    applyUrl: `${url}/c/new`,
  };
};

module.exports = { getUrls, getJobs };
