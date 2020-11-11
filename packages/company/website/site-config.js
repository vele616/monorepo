const path = require('path');

module.exports = {
  siteTitle: 'CroCoder 🐊',
  siteTitleShort: 'CroCoder',
  siteDescription: 'CroCoder.dev helps companies build their product.',
  siteUrl: 'https://crocoder.dev',
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