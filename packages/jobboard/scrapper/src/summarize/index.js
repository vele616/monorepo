const keywords = require("../keywords");

const keywordsForRegex = Object.values(keywords).map(t => t.keywords).flat().join(' | ')
.replace(/\+/g, '\\+')
.replace(/\-/g, '\\-');

const numberYearsExperienceRegex = /[0-9]{1,2}[\-]{0,1}[0-9]{0,2}\+{0,1} [Yy]ears{0,1}[^.!?;:\-(\n\r\t]*(([Ee]xperience[s]{0,1} )|(in )|(of ))((?!\)|\(|\.| - |;|:| \- |\n|\r|\t).)*/g;
const experienceNumberYearsRegex = /[^.!?;:\-)(\n\r\t]*[Ee]xperience[s]{0,1} [^.!?;:\-(\n\r\t]*[0-9]{1,2}[\-]{0,1}[0-9]{0,2}\+{0,1}[^.!?;:\-)(\n\r\t]*[Yy]ears{0,1}((?!\(|\.| - |;|:| \- |\n|\r|\t).)*/g;
const experienceWithRegex = /[^.!?;:\-)(\n\r\t]*[Ee]xperience[s]{0,1} [^.!?;:\-(\n\r\t]*((working )|(with )|(of )|(building ))[^.!?;:\-)(\n\r\t]*/g;
const numberYearsRegex = /[0-9]{1,2}[\-]{0,1}[0-9]{0,2}\+{0,1}[^.!?;:\-(\n\r\t]*[Yy]ears{0,1}((?!\)|\(|\.| - |;|:| \- |\n|\r|\t).)*/g;
const keywordRegex = new RegExp(`[^.!?;:\\-)(\\n\\r\\t]*(${keywordsForRegex})[^.!?;:\\-)(\\n\\r\\t]*experience[s]{0,1}[^.!?;:\\-(\\n\\r\\t]*`, "gi");

const capitalizeFirstLetter = (string) => string ? string.charAt(0).toUpperCase() + string.slice(1) : string;
const lowerFirstLetter = (string) => string ? string.charAt(0).toLowerCase() + string.slice(1) : string;
const addPunctuation = (string) => string && string.charAt(string.length-1) === '.' ? string : `${string}.`;


module.exports = (companyName, title, corpus, hashtags) => {
  const processedTitle = title.match(/((?!, | -|- | - |\(|\)|\/).)*/g)[0].trim();

  const processedCorpus = corpus
    .replace(/<(.|\n)*?>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/  +/g, '\n');

  let phrase;

  [
    numberYearsExperienceRegex,
    experienceNumberYearsRegex,
    experienceWithRegex,
    numberYearsRegex,
    keywordRegex,
  ].every(regex => {
    const result = [...processedCorpus.matchAll(regex)];
    if(result && result[0]) {
      phrase = result[0][0].trim();
      return false;
    }
    return true;
  });

  if (!phrase) {
    phrase = `experience in: ${hashtags.slice(0, 3).join(', ')}`;
  } 

  return `${capitalizeFirstLetter(companyName.trim())} is looking for ${processedTitle.toLowerCase()} that has ${addPunctuation(lowerFirstLetter(phrase))}`;
}
