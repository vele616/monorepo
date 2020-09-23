const getUrls = async (browser, url) => {

  const page = await browser.newPage();
  await page.goto(url);
  
  const uri = new URL(url);

  if ( uri.searchParams.has('for') ) {

    return await page.evaluate(() => {
      const companyName = document.querySelector("#wrapper > h1");
      const logoUrl = document.querySelector("#logo > img");
  
      return {
        urls: [...document.querySelectorAll("#wrapper > section > div > a")].map((anchor) => {
          const id = new URL(anchor.href).searchParams.get('gh_jid');
          const url = new URL(window.location.href);
          url.searchParams.set('token', id);
          url.pathname = '/embed/job_app';
          return url.href;
        }),
        companyName: companyName ? companyName.textContent : undefined,
        logoUrl: logoUrl ? logoUrl.src : null,
        companyWebsite: window.location.href,
      };
    })
  } 

  return await page.evaluate(() => {
    const companyName = document.querySelector("#main > h1");
    const logoUrl = document.querySelector("#logo > img");

    return {
      urls: [...document.querySelectorAll("#main > section > div > a")].map(
        (item) => item.href
      ),
      companyName: companyName ? companyName.textContent : undefined,
      logoUrl: logoUrl ? logoUrl.src : null,
      companyWebsite: window.location.href,
    };
  });
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...await page.evaluate(() => {
      return {
        title: document.querySelector("#header > h1").textContent,
        content: document
          .querySelector("#content")
          .innerHTML.replace(
            /<p[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/p>/g,
            "<p><h2>$1</h2></p>"
          )
          .replace(
            /<div[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>(.*?)<\/strong><\/div>/g,
            "<div><h2>$1</h2></div>"
          )
          .replace(/<br>/g, ""),
        location: document.querySelector('[class="location"]').textContent,
      };
    }),
    url,
    applyUrl: `${url}#app`,
  };
};
module.exports = { getUrls, getJobs };
