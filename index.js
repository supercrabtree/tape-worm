var trim = require('string.prototype.trim');


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



/**
 * Infect is the only exposed method
 *
 * @param tape - A instace of tape / bluetape / redtape etc.
 */

function infect(tape) {
  decorateTape(tape);
};


exports.infect = infect;

