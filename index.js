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



/**
 * Infect is the only exposed method
 *
 * @param tape - A instace of tape / bluetape / redtape etc.
 */

function infect(tape) {
  decorateTape(tape);
};


exports.infect = infect;

