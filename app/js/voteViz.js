var DEFAULT_HEADLINE = 'Write a chart headline';
var DEFAULT_SUBHEAD = 'Describe what the vote means.';

var voteKey = {
  'Y': 'yea',
  'N': 'nay',
  'A': 'absent',
  'E': 'excused'
}

// External resources
var initialTextPath = './data/raw-vote-1.txt';
var legRosterPath = './data/mt-leg-roster.json';
var templateStylePath = './css/main.css'; // CSS to pass to output embed
var templateJsPath = './js/template.js'; // JS to pass to output embed

// Input Form elements
var headlineInput = document.querySelector('#headline-input');
var cutlineInput = document.querySelector('#cutline-input');
var urlInput = document.querySelector('#url-input');
var voteTextInput = document.querySelector('#vote-text-input');

// Output text box
var outputBox = document.querySelector('#html-for-embed');

// Data variables
var voteData, legRoster, chartText, templateCss, templateJs;
// Visualization elements
var vizRoot, vizContainer, vizHtml;

// INITIALIZE APP
function init(){
  vizRoot = d3.select('#viz-root');
  vizContainer = vizRoot.append('div')
    .attr("id","viz-container");
  vizHtml =  vizContainer.append('div')
    .attr("id","viz-contents")
  vizContainer.append("div")
    .attr("id", "tooltip-container")
    .classed('hide', true);

  // Initialize form contents
  headlineInput.value = DEFAULT_HEADLINE;
  cutlineInput.value = DEFAULT_SUBHEAD;

  chartText = {
    'headline': DEFAULT_HEADLINE,
    'cutline': DEFAULT_SUBHEAD
  };

  addFormListeners();
  addOutputBoxListener();

  d3.queue()
    .defer(d3.text, initialTextPath)
    .defer(d3.json, legRosterPath)
    .defer(d3.text, templateStylePath)
    .defer(d3.text, templateJsPath)
    .await(function(err, initText, rosterJson, css, js){
      if (err) throw err;
      voteTextInput.value = initText;
      voteData = processData(initText, rosterJson); // Call to data-processing.js
      legRoster = rosterJson;
      templateCss = css;
      templateJs = js;
      draw(chartText, voteData); // Call to mt-leg-chart.js

      fillOutputBox();
      addGenerateListener();
  });
}

// INPUT FORM HANDLING
function onFormSubmit(e){
  e.preventDefault();
  voteData = processData(voteTextInput.value, legRoster);
  chartText = {
    'headline': headlineInput.value,
    'cutline': cutlineInput.value,
    'url': urlInput.value,
  };
  draw(chartText, voteData);
}
function addFormListeners(){
  document.querySelector('.leg-data-form')
    .addEventListener('submit', onFormSubmit);
}

// EMBED OUTPUT AS HTML
function fillOutputBox(){
  var outputHtml = document.querySelector('#viz-root').innerHTML;
  outputStyle = '<style>' + templateCss + '</style>';
  outputJs = '<script>' + templateJs + '</script>';

  outputBox.value = (
    outputStyle + outputHtml + outputJs
  );
}
function copyOutputBoxContents(){
  document.querySelector('#html-for-embed').select();
  document.execCommand('copy');
}
function addOutputBoxListener() {
  document.querySelector('#output-copy-btn')
    .addEventListener('click', copyOutputBoxContents);
}

// MAKE STATIC IMAGE OF OUTPUT

function addGenerateListener(){
  var generateButton = $('#generate-image');
  generateButton.on('click', makeDownloadImage);
}

function makeDownloadImage(){
  console.log('downloading');
  var exportWidth = 1200;
  var exportHeight = 630;
  var initialScale = 0.5;
  var tolerance = 10;

  var sourceElements = $('#viz-root')
    .find('.vote-total-container, .party-header, .district-container');
  var renderContainer = $('.image-export');
  sourceElements.clone().appendTo(renderContainer);

  // For FB: 1.91:1 aspect size, at least 1200 x 630 px

  renderContainer.css({
    'width': exportWidth + 'px',
    'height': 'auto',
    'transform': 'scale(1)',
    'transform-origin': 'top left'
  });

  // scale up contents to fill exportWidth and exportHeight
  var curHeight = renderContainer.outerHeight();
  var curScale = initialScale;
  while (curHeight < exportHeight - tolerance){
    curScale += 0.01;
    renderContainer.css('transform', 'scale(' + curScale + ')');
    renderContainer.css('width', exportWidth / curScale + 'px');
    curHeight = renderContainer.outerHeight();
  }

  var options = {
    onrendered: function(canvas){
      $("#trigger-image-download").on('click', function(){
        this.href = canvas.toDataURL('image/png');
        this.download = 'vote-map.png';

      });
      $('.static-image-indicator').text('Yes');
      renderContainer.html("");
    },
    background: '#fff',
    height: exportHeight,
    width: exportWidth,
  }
  html2canvas(renderContainer, options);
}

// UTILITY FUNCTIONS
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// MAIN
init();

