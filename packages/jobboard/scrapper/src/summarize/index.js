const keywords = require("../keywords");

const getPreposition = (word) =>
  ["a", "e", "i", "o", "u"].includes(word[0]) ? "an" : "a";

const createTLDR = (company, position, phrase, selectedRegex) =>
  [
    {
      regex: [0, 1, 2, 3, 4],
      expression: `${company} is looking for ${getPreposition(
        position
      )} ${position} that has ${phrase}.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `${company} is searching for ${getPreposition(
        position
      )} ${position} that has ${phrase}.`,
    },
    {
      regex: [5],
      expression: `${company} is looking for ${getPreposition(
        position
      )} ${position} that has ${phrase}.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `If you have ${phrase}, ${company} is looking for someone with your skillset.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `If you have ${phrase}, ${company} is looking for someone with your knowledge.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `If you have ${phrase}, ${company} has a job opening for ${getPreposition(
        position
      )} ${position}`,
    },
    {
      regex: [5],
      expression: `Love ${phrase}? Check out this job post!`,
    },
    {
      regex: [5],
      expression: `Excited about ${phrase}? Check out this job post!`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `${company} wishes to hire a new ${position}. If you have ${phrase}, consider applying.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `If you have ${phrase}, consider applying to ${company}'s job post for a new ${position}.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `${company} intends to hire a new ${position}. If you have ${phrase}, consider applying.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `Interested in new opportunities and have ${phrase}? ${company} has a job opening for ${getPreposition(
        position
      )} ${position}.`,
    },
    {
      regex: [0, 1, 2, 3, 4],
      expression: `To apply as ${getPreposition(
        position
      )} ${position} at ${company}, you preferably need to have ${phrase}.`,
    },
    {
      regex: [5],
      expression: `To apply as ${getPreposition(
        position
      )} ${position} at ${company}, you preferably need to have some ${phrase}.`,
    },
  ].filter((t) => t.regex.includes(selectedRegex));

const keywordsForRegex = Object.values(keywords)
  .map((t) => t.keywords)
  .flat()
  .join(" | ")
  .replace(/\+/g, "\\+")
  .replace(/\-/g, "\\-");

const numberYearsExperienceRegex = /[0-9]{1,2}[\-]{0,1}[0-9]{0,2}\+{0,1} [Yy]ears{0,1}[^.!?;:\-(\n\r\t]*(([Ee]xperience[s]{0,1} )|(in )|(of ))((?!\)|\(|\.| - |;|:| \- |\n|\r|\t).)*/g;
const experienceNumberYearsRegex = /[^.!?;:\-)(\n\r\t]*[Ee]xperience[s]{0,1} [^.!?;:\-(\n\r\t]*[0-9]{1,2}[\-]{0,1}[0-9]{0,2}\+{0,1}[^.!?;:\-)(\n\r\t]*[Yy]ears{0,1}((?!\(|\.| - |;|:| \- |\n|\r|\t).)*/g;
const experienceWithRegex = /[^.!?;:\-)(\n\r\t]*[Ee]xperience[s]{0,1} [^.!?;:\-(\n\r\t]*((working )|(with )|(of )|(building ))[^.!?;:\-)(\n\r\t]*/g;
const numberYearsRegex = /[0-9]{1,2}[\-]{0,1}[0-9]{0,2}\+{0,1}[^.!?;:\-(\n\r\t]*[Yy]ears{0,1}((?!\)|\(|\.| - |;|:| \- |\n|\r|\t).)*/g;
const keywordRegex = new RegExp(
  `[^.!?;:\\-)(\\n\\r\\t]*(${keywordsForRegex})[^.!?;:\\-)(\\n\\r\\t]*experience[s]{0,1}[^.!?;:\\-(\\n\\r\\t]*`,
  "gi"
);

const capitalizeFirstLetter = (string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : string;
const lowerFirstLetter = (string) =>
  string ? string.charAt(0).toLowerCase() + string.slice(1) : string;
const addPunctuation = (string) =>
  string && string.charAt(string.length - 1) === "." ? string : `${string}.`;

module.exports = (companyName, title, corpus, hashtags) => {
  const processedTitle = title
    .match(/((?!, | -|- | - |\(|\)|\/).)*/g)[0]
    .trim();

  const processedCorpus = corpus
    .replace(/<(.|\n)*?>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/  +/g, "\n");

  let phrase;
  let selectedRegex = 0;

  [
    numberYearsExperienceRegex,
    experienceNumberYearsRegex,
    experienceWithRegex,
    numberYearsRegex,
    keywordRegex,
  ].every((regex, i) => {
    const result = [...processedCorpus.matchAll(regex)];
    if (result && result[0]) {
      phrase = result[0][0].trim();
      selectedRegex = i;
      return false;
    }
    return true;
  });

  if (!phrase) {
    phrase = `experience in: ${hashtags.slice(0, 3).join(", ")}`;
    selectedRegex = 5;
  }

  const summaries = createTLDR(
    capitalizeFirstLetter(companyName.trim()),
    processedTitle.toLowerCase(),
    lowerFirstLetter(phrase),
    selectedRegex
  );
  const summaryBackups = createTLDR(
    capitalizeFirstLetter(companyName.trim()),
    processedTitle.toLowerCase(),
    lowerFirstLetter(hashtags.slice(0, 3).join(", ")),
    5
  );

  return {
    summary: summaries[Math.floor(Math.random() * summaries.length)].expression,
    summaryBackup:
      summaryBackups[Math.floor(Math.random() * summaryBackups.length)]
        .expression,
  };
};
