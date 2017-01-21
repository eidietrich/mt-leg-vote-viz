// var json1 = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/60708/legislators.json',
//     out_mini_house = $('#minimap_house'),
//     out_mini_senate = $('#minimap_senate');

// var json = './../data/test.json';

// $.getJSON(json,function(data){
//   var output_house = "",
//       output_senate = "";
//   $.each(data.legislators, function(i){
//     if (data.legislators[i].House == "HD") {
//       output_house += "<div class='"+data.legislators[i].PartyAbbrev+"'>"+data.legislators[i].District+"</div>"
//     }
//   });
//   $.each(data.legislators, function(i){
//     if (data.legislators[i].House == "SD") {
//       output_senate += "<div class='"+data.legislators[i].PartyAbbrev+"'>"+data.legislators[i].District+"</div>"
//     }
//   });
//   out_mini_house.html(output_house);
//   out_mini_senate.html(output_senate);
// });

document.write('hello app');
console.log('hello app');

let checkName= (firstName, lastName) => {
 if(firstName !== 'nader' || lastName !== 'dabit') {
   console.log('You are not Nader Dabit');
 } else {
    console.log('You are Nader Dabit');
  }
}
checkName('nader', 'jackson');