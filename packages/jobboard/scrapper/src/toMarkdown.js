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
  companyName,
  logoUrl,
  companyWebsite,
) =>
  `---
title: "${title.trim()}"
location: "${location}"
host: "${host}"
companyName: "${companyName.trim()}"
url: "${url}"
applyUrl: "${applyUrl}"
timestamp: ${timestamp}
hashtags: "${keywords}"
logoUrl: "${logoUrl}"
companyWebsite: "${companyWebsite}"
---

${turndownService.turndown(sanitize(body))}
`;

sanitize = (html) => sanitizeH1(html);

sanitizeH1 = (html) => {
  return html.toString().trim().replace(/h1/g, 'h2');
}

module.exports = template;