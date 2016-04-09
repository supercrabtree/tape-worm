var test = require('tape');
var tapeworm = require('../');

tapeworm.infect(test);

test('infect should add a method html to t', function (t) {
  t.equal(typeof t.html, 'function');
  t.end();
});


