const preprocess = require('./preprocess');
const process = require('./process');
const processKeywords = require('./processKeywords');

const franc = require('franc');

const rake = ({ delimiters, language, corpus }) => {
  const words = process(preprocess(delimiters, corpus), language);
  return words;
}

module.exports = (corpus, data) => {
  const lang = franc(corpus, { only: ['hrv', 'eng'] });
  const language = lang === 'hrv' ? 'croatian' : 'english';
  const phrases = rake({
    delimiters: ['\\s+', '/'],
    language,
    corpus,
  });
  const keywords = processKeywords(phrases, data, language);
  return { phrases, language, keywords };
}
