const remoteWords = require("../remoteWords");

const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  try {
    await page.click('a[data-ui="clear-filters"]');
    await page.waitFor(500);
  } catch (error) {
    console.log("No Filters To Clear");
  }

  let showMore = true;

  while (showMore) {
    try {
      await page.click('button[data-ui="load-more-button"]');
    } catch (error) {
      showMore = false;
    }
  }

  const selector = await page.evaluate(() => {
    const content = document.querySelector('[data-ui="job-posted"]');
    return {
      content: content ? content.textContent : null,
    };
  });

  if (selector.content === null) {
    return await page.evaluate((remoteWords) => {
      const urls = [...document.querySelectorAll("main > ul > li")]
        .map((el) => {
          const remote = el.querySelector('[data-ui="job-remote"]');
          const url = el.querySelector("a");
          return {
            isRemote: remote ? remote.textContent : null,
            url: url.href,
          };
        })
        .filter((t) =>
          new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
        )
        .map((t) => t.url);

      const companyName = document.querySelector(
        'head > meta[property="og:title"]'
      );
      const logoUrl = document.querySelector(
        "#app > div > div > header > div > a > img"
      );

      return {
        urls,
        companyName: companyName ? companyName.content : undefined,
        logoUrl: logoUrl ? logoUrl.src : null,
        companyWebsite: document.querySelector('[data-ui="company-url"]').href,
      };
    }, remoteWords);
  } else {
    return await page.evaluate((remoteWords) => {
      const urls = [...document.querySelectorAll("main > div > ul > li > div")]
        .map((el) => {
          const remote = el.querySelector('[data-ui="job-remote"]');
          const url = el.querySelector("a");
          const jobPosted = el.querySelector('[data-ui="job-posted"]');
          return {
            isRemote: remote ? remote.textContent : null,
            url: url.href,
            jobPostedAt: jobPosted ? jobPosted.textContent : null,
          };
        })
        .filter((t) => /(day)/g.test(t.jobPostedAt))
        .filter((t) =>
          new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
        )
        .map((t) => t.url);

      const companyName = document.querySelector(
        'head > meta[property="og:title"]'
      );
      const logoUrl = document.querySelector(
        "#app > div > div > header > div > a > img"
      );

      return {
        urls,
        companyName: companyName ? companyName.content : undefined,
        logoUrl: logoUrl ? logoUrl.src : null,
        companyWebsite: document.querySelector('[data-ui="company-url"]').href,
      };
    }, remoteWords);
  }
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  return {
    ...(await page.evaluate(() => {
      const parent = document.querySelector('[role="main"]');
      parent.removeChild(
        document.querySelector('[role="main"] > div:first-child')
      );
      parent.removeChild(
        document.querySelector('[role="main"] > div:last-child')
      );

      const location = document.querySelector('[data-ui="job-location"]');

      return {
        title: document.querySelector("h1").textContent,
        content: parent.innerHTML
          .replace(/(h3|h4)/g, "h2")
          .replace(/<br>/g, ""),
        location: location ? location.textContent.replace("City of Zagreb, ", "") : null,
      };
    })),
    url,
    applyUrl: `${url}apply/`,
  };
};

module.exports = { getUrls, getJobs };
