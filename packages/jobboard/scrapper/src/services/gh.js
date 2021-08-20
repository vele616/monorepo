const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);
  await page.goto(url);

  const uri = new URL(url);

  if (uri.searchParams.has("for")) {
    return await page.evaluate((remoteWords) => {
      const companyName = document.querySelector('[property="og:title"]');
      const logoUrl = document.querySelector("#logo > img");
      const isRemote = [...document.querySelectorAll(".location")];
      const urls = [...document.querySelectorAll("section > div > a")]
        .map((anchor) => {
          const id = new URL(anchor.href).searchParams.get("gh_jid");
          const url = new URL(window.location.href);
          url.searchParams.set("token", id);
          url.pathname = "/embed/job_app";
          return url;
        })
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
        companyName: companyName ? companyName.content : undefined,
        logoUrl: logoUrl ? logoUrl.src : null,
        companyWebsite: window.location.href,
      };
    }, remoteWords);
  }

  return await page.evaluate((remoteWords) => {
    const companyName =
      document.querySelector('[property="og:title"]')?.content ||
      document.querySelector("h1")?.textContent;
    const logoUrl = document.querySelector("#logo > img");
    const isRemote = [...document.querySelectorAll(".location")];
    const urls = [...document.querySelectorAll("section > div > a")]
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
      companyName: companyName ? companyName : null,
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: window.location.href,
    };
  }, remoteWords);
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      return {
        title: document.querySelector("#header > h1").textContent.trim(),
        content: document
          .querySelector("#content")
          .innerHTML.replace(/<br>/g, "")
          .replace(/(h1|h3|h4)/g, "h2")
          .replace(
            /<(p|div|h2)[a-zA-Z-=_0-9":;\. ]*>(.*?)<strong[a-zA-Z-=_0-9":;\. ]*>([^<]+)<\/strong>(.*?)<\/(p|div|h2)>/g,
            "<h2>$2$3$4</h2>"
          )
          .replace(
            /<(h2|span)[a-zA-Z-=_0-9":;\. ]*>(.*?)<(span|strong)[a-zA-Z-=_0-9":;\. ]*>([^<]+)<\/(span|strong)><\/(h2|span)>/g,
            "<span>$2$4</span>"
          )
          .replace(/h5/g, "p"),
        location: document.querySelector('[class="location"]').textContent,
      };
    })),
    url,
    applyUrl: `${url}#app`,
  };
};
module.exports = { getUrls, getJobs };
