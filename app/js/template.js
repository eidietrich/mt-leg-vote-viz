/* For JS that needs to be passed to rendered chart */

// TOOLTIP HANDLING
var tooltip, viz;
var BREAKPOINT = 768;

function initializeFilters(){
  $('#filterDems').click(function(){
    $(".district").addClass('filter');
    $(".district.gop").addClass('filter');
    $(".district.dem").removeClass('filter');
  });
  $('#filterGOP').click(function(){
    $(".district").addClass('filter');
    $(".district.dem").addClass('filter');
    $(".district.gop").removeClass('filter');
  });
  $('#filterYeas').click(function(){
    $(".district").addClass('filter'); // turn all off, including non-votes
    $(".district.nay").addClass('filter');
    $(".district.yea").removeClass('filter');
  });
  $('#filterNays').click(function(){
    $(".district").addClass('filter');
    $(".district.yea").addClass('filter');
    $(".district.nay").removeClass('filter');
  });
  $('#filterReset').click(function(){
    $(".district").removeClass('filter');
  });
}

function initializeTooltips(){
  var districts = $('.district');
  tooltip = $('#tooltip-container');
  viz = $('#viz-container');
  var displayIsMobile = ($(window).width() < BREAKPOINT)
  var tooltipBuilder = displayIsMobile ? turnOnMobileTooltip : turnOnDesktopTooltip;
  // districts.hover(tooltipBuilder, turnOffTooltip);
  districts.mousemove(tooltipBuilder);
  districts.mouseleave(turnOffTooltip);

  if (displayIsMobile) {
    // close mobile tooltip on any page touch
    $(tooltip).on('click', turnOffTooltip);
  }
}
function turnOnMobileTooltip(e){
  tooltip.html(buildTooltipHtml(e.target));
  tooltip.css({
    'pointer-events': 'auto',
    'width': '100%',
    'position': 'fixed',
    'left': '0px',
    'top': 'auto',
    'bottom': '0px',
  });
  tooltip.removeClass('hide');
}
function turnOnDesktopTooltip(e){
  tooltip.html(buildTooltipHtml(e.target));
  tooltip.css({
    'pointer-events': 'none',
    'width': 'auto',
    'position': 'fixed',
    'left': (e.clientX + 10) + "px",
    'top': (e.clientY + 10) + "px",
    'bottom': 'auto'
  });
  tooltip.removeClass('hide');
}
function turnOffTooltip(d){
  tooltip.addClass('hide');
}

function buildTooltipHtml(element){
  var name = element.getAttribute('leg-name');
  var partyAndCity = element.getAttribute('leg-party');
  var vote = element.getAttribute('leg-vote');

  var partyClass = 'other-party';
  if (partyAndCity[0] === 'D') { partyClass = 'dem'; }
  if (partyAndCity[0] === 'R') { partyClass = 'gop'; }
  var voteClass = 'other-vote';
  if (vote === 'Yea') { voteClass = 'support'; }
  if (vote === 'Nay') { voteClass = 'oppose'; }

  var tooltipHtml = (
    '<div class="tooltip-content">' +
    '<p class="tooltip-title">' + name + '</p>' +
    '<p class="tooltip-text"><span class="' + partyClass + '">' + partyAndCity + '</span></p>' +
    '<p class="tooltip-text"><span class="' + voteClass + '">' + vote + '</span></p>' +
    '</div>'
  );

  return tooltipHtml;
}

initializeTooltips();
initializeFilters();
