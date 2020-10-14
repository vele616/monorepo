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
      const location = document.querySelector(".info > ul > li:last-child");

      return {
        title: document.querySelector(".info > h2").textContent,
        content: parent.innerHTML
          .replace(/\n/g, "")
          .replace(/<br>/g, "")
          .replace(/h3/g, "h2")
          .replace(/h1/g, "h2")
          .replace(/<p><strong>([^<]+)<\/strong><\/p>/g, "<h2>$1</h2>") //crate - finance accounting specialist
          .replace(/<h2>(<.+>)*<strong>([^<]+)<\/strong>(<.+>)*<\/h2>/g, "<h2>$1</h2>")
          .replace(/<span[a-zA-Z-=0-9":;\. ]*><strong><\/strong><strong>(.*)<\/strong><\/span>/g, "<h2>$1</h2>")//crate - finance accounting specialist
          .replace(/<h2><strong>(.*)<\/strong><\/h2>/g, "<h2>$1</h2>"), // vidIQ - product manager core
          //.replace(/<h2><span[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/span><\/h2>/g, "<p>$1</p>"), // vidIQ - product manager core 
        location: location ? location.textContent.trim() : null,
      };
    })),
    url,
    applyUrl: `${url}/c/new`,
  };
};

module.exports = { getUrls, getJobs };
