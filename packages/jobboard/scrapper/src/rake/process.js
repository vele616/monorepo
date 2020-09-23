const loadStemmer = require('./stemmer');

const strip = text => text
  .replace(/[^a-zčćđžš\-']/gi, ' ')
  .replace(/(^|\s)+\w($|\s)+/g, ' ')
  .trim()
  .replace(/\s{2,}/g, ' ');

const loadStoplist = language => {
  const list = require('./stopwords/' + language);
  return new Set(list);
}

module.exports = (wordArray, language) => {
  const stopwords = loadStoplist(language);
  const stemmer = loadStemmer(language);
  const phrases = wordArray
    .map(word => word.toLowerCase())
    .map(word => {
      const stripped = strip(word);
      return {
        word,
        stripped,
        isStopword: stopwords.has(word) || word.length <= 2 || strip(word).length <= 1,
        hasPunctuation: stripped !== word,
        stem: stemmer.stemword(stripped),
      }
    })
    .reduce((acc, value) => {
      if(value.isStopword) {
        acc.push({
          words: [],
          stems: [],
        });
      } else if (value.hasPunctuation) {
        acc[acc.length-1].words.push(value.stripped);
        acc[acc.length-1].stems.push(value.stem);
        acc.push({
          words: [],
          stems: [],
        });
      } else {
        acc[acc.length-1].words.push(value.stripped);
        acc[acc.length-1].stems.push(value.stem);
      }
      return acc;
    }, [{
      words: [],
      stems: [],
    }])
    .filter(t => t.words.length)
    .reduce((acc, value) => {
      for(let i = 1; i <= value.stems.length; i++) {
        const newValues = value.stems
          .reduce((acc, _, index, stems) => {
            if (index+i > stems.length) {
              return acc;
            }
            acc.push({
              stems: stems.slice(index, index+i),
              words: value.words.slice(index, index+i),
            });
            return acc;
          }, []);
          newValues.forEach(newValue => {
            if(acc[newValue.stems.join(' ')]) {
              acc[newValue.stems.join(' ')] += 1;
            } else {
              acc[newValue.stems.join(' ')] = 1;
            }
          });
      }
      return acc;
    }, {});
  return phrases;
};