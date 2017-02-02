// DRAW GRAPHIC

function draw(text, data){
  console.log('drawing with', data);
  var headline = text.headline;
  var cutline = text.cutline;
  var totals = data.totals;
  var votesByDistrict = data.votesByDistrict;

  vizHtml.html("") // clears out viz div

  vizHtml.append('h2').text(headline);
  vizHtml.append('p').text(cutline);
  vizHtml.append('p')
    .attr('class','vote-total-container')
    .html(
      '<span class="number-large">' + totals.overall.yea + '</span> ' +
      '<span class="support"> in favor</span>, ' +
      '<span class="number-large">' + totals.overall.nay + '</span> ' +
      '<span class="oppose">opposed</span>'
    );
  var isPlural = ((totals.overall.absent + totals.overall.excused) === 1);
  var plural = isPlural ? '' : 's';

  vizHtml.append('p')
    .attr('class','vote-total-container')
    .html(
      '(With ' +
      '<span>' + (totals.overall.absent + totals.overall.excused) + '</span> ' +
      'lawmaker' + plural + ' excused or absent)'
    );
  vizHtml.append('p').html(
    'Of <span class="gop">Republicans</span>: ' +
    '<span class="number-small">' + totals.ofGOP.yea + '</span> ' +
    '<span class="support">in favor</span>, ' +
    '<span class="number-small">' + totals.ofGOP.nay + '</span> ' +
    '<span class="oppose">opposed</span>.');
  vizHtml.append('p').html(
    'Of <span class="dem">Democrats</span>: ' +
    '<span class="number-small">' + totals.ofDems.yea + '</span> ' +
    '<span class="support">in favor</span>, ' +
    '<span class="number-small">' + totals.ofDems.nay + '</span> ' +
    '<span class="oppose">opposed</span>.'
  );
  var districts = vizHtml.append('div')
    .attr("class","district-container")
    .selectAll('.district')
    .data(votesByDistrict).enter();
  districts.append('div')
    .attr('class', 'district')
    .classed('yea', function(d){ return d.vote === "Y"; })
    .classed('nay', function(d){ return d.vote === "N"; })
    // Attrs to pass data to rendered version of object
    .attr('leg-name', function(leg){ return leg.firstName + ' ' + leg.lastName; })
    .attr('leg-party', function(leg){ return leg.party + '-' + leg.city; })
    .attr('leg-vote', function(leg){
      return capitalizeFirstLetter(voteKey[leg.vote])
    })
    .html(function(d){ return '<span>' + d.district + '</span>'; });

  initializeTooltips(); // calls to template.js
  fillOutputBox(); // calls back to main voteViz.js
}