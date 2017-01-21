var fs = require('fs');

const fileString = './data/raw-vote-1.txt';
const outputFile = './data/raw-vote-1.json';

// Regex to match 'V  Last, First' legislator name pattern
const voteNameRe = /[NYAE]  [A-Z][']?[\w\-\s]+, [\w]+( \w{2,})?/g;
/* Explanation
- [NYAE] matches vote indicators (Nay, Aye, Absent, Excusted)
- [A-Z][']?[\w\-\s]+ matches last name, including second-letter apostrophes, hyphens and dual last names separated by single space
- [\w]+( \w{2,})? matches first name, including optional second first name (e.g. "Mary Ann")
*/

function readText(filePath){
  // Reads txt file synchronously, parses into array of objects
  string = fs.readFileSync(filePath, 'utf-8');
  return string;
}

function writeAsJson(filePath, object){
  let json = JSON.stringify(object, null, 2);
  fs.writeFile(filePath, json, function(err){
    if (err) {
      console.log(err);
    }
  });
}

function parseText(string){
  // Text to array of names and votes
  let votesAndNames = string.match(voteNameRe);
  return votesAndNames.map(function(voteAndName){
    let leg = {}
    leg.name = voteAndName.slice(3);
    leg.vote = voteAndName[0];
    return leg;
  });
}

let text = readText(fileString);
let textArray = parseText(text)

writeAsJson(outputFile, textArray);
console.log('DONE');
// console.log(textArray);