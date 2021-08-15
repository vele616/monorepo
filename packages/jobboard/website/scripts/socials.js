const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const serveStatic = require('serve-static');
const http = require('http');
const { execSync } = require('child_process');

const getChunks = (arr, size) => {
  const result = [];
  while (arr.length) {
    result.push(arr.splice(0, size));
  }
  return result;
};

const serve = serveStatic('public', { index: ['index.html', 'index.htm'] });

const server = http.createServer(function onRequest(req, res) {
  serve(req, res, () => {});
});

server.listen(5000);
// const files = fs.readdirSync(path.join(__dirname, '../content/jobs/'));

const stdout = execSync(
  `grep -riL 'archived: "true"' ${path.join(__dirname, '../content/jobs/')}`,
  { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }
).toString();

const files = stdout.split('\n').filter((t) => !!t);

const jobs = files
  .filter((f) => /^.*md$/.test(f))
  .map((f) => {
    const data = f.split('.')[0].split('/');
    return data[data.length - 1];
  })
  .map((f) => ({
    file: `static/social/${f}.png`,
    url: `http://localhost:5000/jobs/${f}/social`,
  }));

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1024,
      height: 512,
    },
  });

  const chunkedJobPostUrls = getChunks(jobs, 10);

  for (let index = 0; index < chunkedJobPostUrls.length; index++) {
    const chunk = chunkedJobPostUrls[index];

    await Promise.all(
      chunk.map(async ({ url, file }) => {
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: file });
      })
    );
  }

  await browser.close();
  server.close();
})();
