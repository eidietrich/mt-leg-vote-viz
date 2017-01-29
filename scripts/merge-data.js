var fs = require('fs');

const votePath = './../data/raw-vote-1.json';
const legRosterPath='./../data/mt-leg-roster-house.json';

const outPath = './data/vote-1-merged.json';


const chamber = 'house';

const votes = require(votePath);
const legislators = require(legRosterPath);

function writeAsJson(filePath, object){
  let json = JSON.stringify(object, null, 2);
  fs.writeFile(filePath, json, function(err){
    if (err) {
      console.log(err);
    }
  });
  // console.log('wrote', object, 'to', filePath);
}

// console.log(votes[0]);
// console.log(legislature[chamber][0]);

// NOTE: Have added altNames: [] field to roster json manually!

let merged = votes.map(function(vote){
  let merge = {};
  merge.vote = vote.vote;

  let name = vote.name.toUpperCase();

  // Find legislator info
  let legInfo = legislators[chamber].filter(function(leg){
    let matchNames = [leg.name].concat(leg.altNames);
    return matchNames.indexOf(name) >= 0;
  })[0]; // [0] selects first (and hopefully only) match
  if (!legInfo) {
    console.log('No match for ', name)
    return merge;
  }

  let districtNum = +legInfo['Districts'].slice(3);

  merge.firstName = legInfo['FirstName'];
  merge.lastName = legInfo['LastName'];
  merge.district = legInfo['Districts'];
  merge.districtNum = districtNum;
  merge.party = legInfo['PartyAbbrev'];
  merge.city = legInfo['City'];

  // console.log(merge);
  return merge;
})

writeAsJson(outPath, merged);