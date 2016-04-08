var trim = require('string.prototype.trim');


/**
 * Create the colors and favicons used to style the page
 */

var colors = {
  pending: '#F3EDD3',
  failing: '#FFECEC',
  passing: '#EAFFEA'
};

var richColors = {
  pending: '#FCD62A',
  failing: '#DE4343',
  passing: '#8ECA6C'
};

var favicons = {
  pending: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2P8c03rPwMFgHHUAIbRMGAYDQOGYREGAKXKL8HxxzjXAAAAAElFTkSuQmCC',
  failing: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2O85+z8n4ECwDhqAMNoGDCMhgHDsAgDADNuJkH6lyxeAAAAAElFTkSuQmCC',
  passing: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4T2PsO5Xzn4ECwDhqAMNoGDCMhgHDsAgDABOhLEG8Hw/SAAAAAElFTkSuQmCC'
};


/**
 * Used to count how many tests have passed or failed
 */

var failed = 0;
var passed = 0;


/**
 * Set up the favicon element
 */

var faviconEl = document.createElement('link');
faviconEl.setAttribute('rel', 'icon');
faviconEl.setAttribute('type', 'img/png');
document.head.appendChild(faviconEl);


/**
 * Some initial styles, border color is changed when tests are run
 */

document.body.style.margin = 0;
document.body.style.borderTopWidth = '10px';
document.body.style.borderTopStyle = 'solid';


/**
 * A container for our test results, with a little margin
 */

var testResults = document.body.appendChild(document.createElement('div'));
testResults.style.margin = '10px';


/**
 * Style the page
 */

function style() {
  var testsAre = 'pending';

  if (failed > 0) {
    testsAre = 'failing';
  }
  else if (passed > 0) {
    testsAre = 'passing';
  }

  document.body.style.borderTopColor = richColors[testsAre];
  faviconEl.setAttribute('href', favicons[testsAre]);
  document.body.style.backgroundColor = colors[testsAre];
}


/**
 * Add an .html() method to tape's t
 */

function decorateTape(tape) {
  tape.Test.prototype.html = function (message) {
    var that = this;
    trim(message).split('\n').forEach(function (aMsg) {
      that.emit('result', trim(aMsg).replace(/^\s*/, '#tapeworm-html'));
    });
  };
}


function count(message) {
  if (/^ok/.test(message)) passed++;
  if (/^not ok/.test(message)) failed++;
}

/**
 * Infect is the only exposed method
 *
 * @param tape - A instace of tape / bluetape / redtape etc.
 */

function infect(tape) {
  decorateTape(tape);
};


exports.infect = infect;

