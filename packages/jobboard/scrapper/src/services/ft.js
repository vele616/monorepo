import remoteWords from "../remoteWords";

const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => {
    const isRemote = [
      ...document.querySelectorAll(".job-location > a:first-child"),
    ];
    const urls = [...document.querySelectorAll("a.job-title")]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => new RegExp(`${remoteWords.join('|')}`, 'gi').test(t.isRemote))
      .map((t) => t.url);
    return {
      urls,
      companyName: document
        .querySelector('[property="og:title"]')
        .content.replace("Careers - ", ""),
      logoUrl: document.querySelector(".portal-img > img").src,
      companyWebsite: document.querySelector('[class="navbar-brand"]').href,
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
