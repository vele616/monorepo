const path = require('path');

module.exports = {
  siteTitle: 'CroCoder Jobs 🐊',
  siteTitleShort: 'CroCoder Jobs',
  siteDescription:
    'CroCoder Jobs is a hub for all remote jobs that are available in Croatia and Europe.',
  siteUrl: 'https://jobs.crocoder.dev',
  themeColor: '#000',
  backgroundColor: '#fff',
  pathPrefix: null,
  logo: path.resolve(__dirname, 'static/icon.png'),
  social: {
    twitter: 'https://twitter.com/crocoderdev',
    linkedin: 'https://www.linkedin.com/company/crocoderdev',
    github: 'https://github.com/crocoder-dev',
  },
};
