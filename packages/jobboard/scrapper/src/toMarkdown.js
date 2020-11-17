const TurndownService = require('turndown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

const template = (
  title,
  location,
  host,
  url,
  applyUrl,
  timestamp,
  body,
  keywords,
  jobType,
  companyName,
  logoUrl,
  companyWebsite,
  summary,
  summaryBackup,
) =>
  `---
title: "${title.trim()}"
location: "${location.trim()}"
host: "${host}"
companyName: "${companyName.trim()}"
url: "${url}"
applyUrl: "${applyUrl}"
timestamp: ${timestamp}
hashtags: "${keywords}"
jobType: "${jobType}"
${logoUrl ? `logoUrl: "${logoUrl}"` : ''}
companyWebsite: "${companyWebsite}"
summary: "${summary}"
summaryBackup: "${summaryBackup}"
---

${turndownService.turndown(sanitize(body))}
`;

sanitize = (html) => sanitizeH1(html);

sanitizeH1 = (html) => {
  return html.toString().trim().replace(/h1/g, 'h2');
}

module.exports = template;