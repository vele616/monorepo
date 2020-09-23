module.exports = (langauge) => {
  if(langauge === 'croatian') {
    return require('./stemmer/index');
  } else {
    return require('node-snowball');
  }
}