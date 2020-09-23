module.exports = {
  stemword: (word) => {
    const rules = require('./rules').map(rule => new RegExp(`^(${rule.basis})('${rule.extension})$`));
    const transformation = require('./transformation');
    let transformedWord = transformation.reduce((acc, tf) => {
      if(acc !== null) return acc;
      if(word.endsWith(tf.from)) {
        return `${word.substring(0, word.lastIndexOf(tf.from))}${tf.to}`;
      }
      return null;
    }, null);

    if(transformedWord === null) transformedWord = word;

    const match = rules.reduce((acc, rule) => {
      if(acc !== null) return acc;
      const result = rule.exec(transformedWord);
      if(result) {
        return result;
      }
      return null;
    }, null);
    if(match) {
      const hasVowel = match[1]
        .replace(/(^|[^aeiou])r($|[^aeiou])/, '$1R$2')
        .search(/[aeiouR]/) > 0;
      if(hasVowel && match[1].length > 1) {
        return match[1];
      } else {
        return word;
      }
    }
    return word;
  }
}