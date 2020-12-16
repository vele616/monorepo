const fs = require('fs');
const data = require('./data');

data.forEach(t => {
  try {
    const file = `../../packages/jobboard/website/content/jobs/${t.jobPostFilename}`;
  
    const text = fs.readFileSync(file, 'utf8');
  
    const regex = /---/g;
  
  
    const pos = text.indexOf('---', 4);
  
    const newText = text.slice(0, pos) + 'archived: "true"\n---' + text.slice(pos+3);
  
    fs.writeFileSync(file, newText);

  } catch (err) {

  }

});
