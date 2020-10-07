import remoteWords from "../remoteWords";

const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => {
    const companyName = document.querySelector("a > img");
    const isRemote = [...document.querySelectorAll(".ResAts__listing")];
    const urls = [...document.querySelectorAll("li > div > div > a")]
      .map((url, i) => ({
        url: url.href,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => new RegExp(`${remoteWords.join('|')}`, 'gi').test(t.isRemote))
      .map((t) => t.url);

      return {
        urls,
        companyName: companyName ? companyName.alt : undefined,
        logoUrl: document.querySelector(
          "body > div.container > div.row > div.col-xs-12.col-sm-8.ResAts__header > a > img"
        ).src,
        companyWebsite: window.location.href,
      }

  });
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      const avgLength = [
        ...document
          .querySelector(".col-xs-12.BambooRichText")
          .querySelectorAll("p"),
      ]
        .map((p) => p.textContent.length)
        .filter((l) => l > 1)
        .reduce((acc, l, i, src) => acc + l / src.length, 0);
      const content = [
        ...document.querySelector(".col-xs-12.BambooRichText").children,
      ]
        .map((i) => {
          if (i.localName === "p" && i.textContent.length < avgLength / 4) {
            return `<h2>${i.textContent}</h2>`;
          } else if (i.localName === "ul" || i.localName === "ol") {
            return i.innerHTML;
          } else {
            return `<p>${i.textContent}</p>`;
          }
        })
        .join("");
      return {
        title: document.querySelector("h2").textContent,
        content,
        location: document.querySelector(".posInfo__Value").textContent,
      };
    })),
    url,
    applyUrl: url,
  };
};

module.exports = { getUrls, getJobs };
