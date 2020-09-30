const getUrls = async (browser, url) => {
  const page = await browser.newPage();

  await page.goto(url);

  return await page.evaluate(() => {

    const logoUrl = document.querySelector('.brand-logo > img');
    const companyWebsite = document.querySelector('.jobs-navbar > div > a');
    
    return {
      urls: [...document.querySelectorAll('.jobs-list > ul > li> h4 > a')].map(i => i.href),
      companyName: document
        .querySelector('[property="og:title"]')
        .getAttribute("content")
        .replace(' - Career Page', ''),
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: companyWebsite ? companyWebsite.href : null,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {

      const avgLength = [
        ...document
          .querySelector('.description')
          .querySelectorAll("p"),
      ]
        .map((p) => p.textContent.length)
        .filter((l) => l > 1)
        .reduce((acc, l, i, src) => acc + l / src.length, 0);

      const content = [...document.querySelector('.description').children].map((i) => {
        if (i.localName === "h2") {
          return `<h2>${i.textContent}</h2>`;
        } else if (i.localName === "p" && i.textContent.length < avgLength / 3) {
          return `<h2>${i.textContent}</h2>`;
        } else if (i.localName === "ul" || i.localName === "ol") {
          return i.innerHTML;
        } else {
          return `<p>${i.textContent}</p>`;
        }
      }).join("");

      return {
        title: document.querySelector('.job-header > div > h1').textContent,
        content: content,
        location: document.querySelector('[title="Location"]').textContent,
      };
    })),
    url,
    applyUrl: url,
  };
};

module.exports = { getUrls, getJobs };
