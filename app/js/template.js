/* For JS that needs to be passed to rendered chart */

// TOOLTIP HANDLING
var tooltip, viz;
var BREAKPOINT = 400;

function initializeTooltips(){
  var districts = $('.district');
  tooltip = $('#tooltip-container');
  viz = $('#viz-container');
  var displayIsMobile = (viz.width() < BREAKPOINT)
  var tooltipBuilder = displayIsMobile ? turnOnMobileTooltip : turnOnDesktopTooltip;
  districts.hover(tooltipBuilder, turnOffTooltip);
}
function turnOnMobileTooltip(e){
  tooltip.html(buildTooltipHtml(e.target));
  tooltip.css({
    'width': '100%',
    'left': '0px',
    'bottom': '0px',
    'max-height': '100px'
  });
  tooltip.removeClass('hide');
}
function turnOnDesktopTooltip(e){
  tooltip.html(buildTooltipHtml(e.target));
  tooltip.css({
    'pointer-events': 'none',
    'left': e.clientX + "px",
    'top': e.clientY + "px"
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
