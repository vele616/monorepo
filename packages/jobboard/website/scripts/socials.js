const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const files = fs.readdirSync(path.join(__dirname, '../content/jobs/'));
const jobs = files.filter(f => /^.*md$/.test(f)).map(f => ({ file: `${f.split('.')[0]}.png`, url: `http://localhost:5000/jobs/${f.split('.')[0]}/social`}));


(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1024,
      height: 512,
    }
  });

  await Promise.all(jobs.map(async ({ url, file }) => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({path: file});
  }));

  await browser.close();
})();