const remoteWords = require("../remoteWords");
const createPage = require("../page/createPageWithInterceptor");

const getUrls = async (browser, url) => {
  const page = await createPage(browser);

  await page.goto(url);

  return await page.evaluate((remoteWords) => {
    const companyName = document.querySelector('[property="og:title"]');
    const logoUrl = document.querySelector(".hide-sm-block > img");
    const companyWebsite = document.querySelector(
      "footer > div > div > div > div > div > a"
    );
    const isRemote = [
      ...document.querySelectorAll(
        "div.rt-tbody > div > div > div:nth-child(3)"
      ),
    ];
    const urls = [
      ...document.querySelectorAll(
        "div.rt-tbody > div > div > div > div > a.hide-at-sm-block.text-bold"
      ),
    ]
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
      companyName: companyName
        ? companyName.content.replace("Careers at ", "")
        : undefined,
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite
        ? companyWebsite.href
        : window.location.href,
    };
  }, remoteWords);
};

const getJobs = async (browser, url) => {
  const page = await createPage(browser);
  await page.goto(url);

  return {
    ...(await page.evaluate(() => {
      const location = [
        ...document.querySelectorAll(
          "sidebar > section > div > div > div > div > dl > dd"
        ),
      ]
        .map((i) => i.textContent)
        .slice(0, -1)
        .splice(-1, 1);

      const parent = document.querySelector(
        "body > div.external-content > div.external-content-wrap.external-2-col > main > section > div > div:nth-child(2)"
      );
      parent.removeChild(
        document.querySelector(
          "body > div.external-content > div.external-content-wrap.external-2-col > main > section > div > div:nth-child(2) > dl"
        )
      );
      parent.removeChild(
        document.querySelector(
          "body > div.external-content > div.external-content-wrap.external-2-col > main > section > div > div:nth-child(2) > div.frow.frow--centered-column.mar-t-8.mar-t-md-14"
        )
      );

      return {
        title: document.querySelector("header > h1").textContent.trim(),
        content: parent.innerHTML
          .replace(/\n|<br>/g, "")
          .replace(/<strong>([^<]+)<\/strong>/g, "<h2>$1</h2>"),
        location: location.lastItem,
      };
    })),
    url,
    applyUrl: `${url}/applications/new`,
  };
};

module.exports = { getUrls, getJobs };
