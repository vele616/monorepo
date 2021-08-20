const createPageWithInterceptor = async (browser) => {
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (
      ["image", "stylesheet", "font", "script"].indexOf(
        request.resourceType()
      ) !== -1
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  return page;
};
