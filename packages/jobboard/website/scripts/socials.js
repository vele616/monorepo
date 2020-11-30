const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const serveStatic = require('serve-static');
const http = require('http');

const getChunks = (arr, size) => {
  const result = [];
  while(arr.length) {
    result.push(arr.splice(0, size));
  }
  return result;
}

const serve = serveStatic('public', { 'index': ['index.html', 'index.htm'] })
 
const server = http.createServer(function onRequest (req, res) {
  serve(req, res, () => {});
})

server.listen(5000);
const files = fs.readdirSync(path.join(__dirname, '../content/jobs/'));
const jobs = files.filter(f => /^.*md$/.test(f)).map(f => ({ file: `static/social/${f.split('.')[0]}.png`, url: `http://localhost:5000/jobs/${f.split('.')[0]}/social`}));


(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1024,
      height: 512,
    }
  });

  const chunkedJobPostUrls = getChunks(jobs, 10);

  for (let index = 0; index < chunkedJobPostUrls.length; index++) {

    console.log(index);
    const chunk = chunkedJobPostUrls[index];
    
    await Promise.all(chunk.map(async ({ url, file }) => {
      const page = await browser.newPage();
      console.log(url);
      await page.goto(url);
      await page.screenshot({path: file});
    }));
  }


  await browser.close();
  server.close();
})();