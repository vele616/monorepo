module.exports = (delimiters, corpus) => corpus
    .replace(/\\[nrt]/g, '. ')
    .split(new RegExp('[' + delimiters.map(d => '(' + d + ')').join('') + ']', 'g'))
    .filter(Boolean);