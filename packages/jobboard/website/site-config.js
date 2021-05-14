const path = require('path');

module.exports = {
  siteTitle: 'CroCoder Jobs | Remote jobs updated daily',
  siteTitleShort: 'CroCoder Jobs',
  siteDescription:
    'Find every remote job available for IT experts across Croatia and Europe. CroCoder Jobs has all of the latest remote jobs in one place, updated daily.',
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
