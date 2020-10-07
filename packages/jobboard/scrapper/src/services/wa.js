import remoteWords from "../remoteWords";

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

  return await page.evaluate(() => {
    const jobPosted = [...document.querySelectorAll('[data-ui="job-posted"]')];
    const isRemote = [...document.querySelectorAll("ul > li > div > div")];
    const urls = [...document.querySelectorAll("ul > li > div > a")]
      .map((url, i) => ({
        url: url.href,
        jobPostedAt: jobPosted[i].textContent,
        isRemote: isRemote[i].textContent,
      }))
      .filter((t) => /(day)/g.test(t.jobPostedAt))
      .filter((t) => new RegExp(`${remoteWords.join('|')}`, 'gi').test(t.isRemote))
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
  });
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

      return {
        title: document.querySelector("h1").textContent,
        content: parent.innerHTML
          .replace(/h4/g, "h2")
          .replace(/h3/g, "h2")
          .replace(/<br>/g, ""),
        location: document
          .querySelector('[data-ui="job-location"]')
          .textContent.replace("City of Zagreb, ", ""),
      };
    })),
    url,
    applyUrl: `${url}apply/`,
  };
};

module.exports = { getUrls, getJobs };
