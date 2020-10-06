const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => {
    const companyName = document.querySelector('[property="og:url"]');
    const logoUrl = document.querySelector("a.brand > img");
    const companyWebsite = document.querySelector(".link.misc.company > a");
    const isRemote = [...document.querySelectorAll(".location")];
    const urls = [...document.querySelectorAll("li.position.transition > a")]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => /(remote)/gi.test(t.isRemote))
      .map((t) => t.url);

    return {
      urls,
      companyName: companyName
        ? companyName.content.match(
            /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/
          )[1]
        : undefined,
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("div > h1").textContent,
        content: document
          .querySelector(".description")
          .innerHTML.replace(/h4/g, "h2")
          .replace(/h3/g, "h2")
          .replace(
            /<p[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/p>/g,
            "<p><h2>$1</h2></p>"
          )
          .replace(/strong/g, "a")
          .replace(/<br>/g, ""),
        location: document.querySelector(".location").textContent,
      };
    })),
    url,
    applyUrl: `${url}/apply`,
  };
};

module.exports = { getUrls, getJobs };
