const loadStemmer = require('./stemmer');

module.exports = (phrases, keywords, language) => {
  const result = {};
  const stemmer = loadStemmer(language);

  const keywordIndex = Object.keys(keywords).reduce((acc, key) => {
    keywords[key].keywords.forEach(keyword => {
      acc[stemmer.stemword(keyword)] = key;
    });
    return acc;
  }, {}); 

  for (const keyword of Object.keys(keywordIndex)) {
    for (const phrase of Object.keys(phrases)) {
      if(keyword === phrase) {
        result[keywordIndex[keyword]] = (result[keywordIndex[keyword]] || 0) + phrases[phrase];
      }
    }
  }
  return result;
}