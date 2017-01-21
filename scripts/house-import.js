
var fs = require('fs');
var parse = require('csv-parse/lib/sync');
var d3 = require('d3');

const houseRosterPath = './raw-data/house-roster.csv';
const senateRosterPath = './raw-data/senate-roster.csv';

const legRosterPath = './data/mt-leg-roster.json';

function readCsv(filePath){
  // Reads csv file synchronously, parses into array of objects
  data = fs.readFileSync(filePath, 'utf-8');
  return parse(data, {columns: true});
}
function writeAsJson(filePath, object){
  let json = JSON.stringify(object, null, 2);
  fs.writeFile(filePath, json, function(err){
    if (err) {
      console.log(err);
    }
  });
  // console.log('wrote', object, 'to', filePath);
}
function toTitleCase(string){

  return
}

function processLegislator(object){
  let legislator = JSON.parse(JSON.stringify(object)); // make copy
  let first = legislator.FirstName;
  let last = legislator.LastName;

  legislator.name = [last, first].join(', ');

  return legislator;
}

let house = readCsv(houseRosterPath);
let senate = readCsv(senateRosterPath)

house = house.map(function(legislator){
  return processLegislator(legislator);
})
senate = senate.forEach(function(legislator){
  return processLegislator(legislator);
})

let combined = {
  'house': house,
  'senate': senate
}

// console.log(house.slice(0,2));
// console.log(senate.slice(0,2));

writeAsJson(legRosterPath, combined);
console.log('done');
