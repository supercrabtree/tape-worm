var tape = require('tape');
var bl = require('bl');
var tapeworm = require('../');

tapeworm.infect(tape);

test('infect should add a method html to t', function (t) {
  t.equal(typeof t.html, 'function');
  t.end();
}, verifyAsserts({ok: 1, fail: 0}));


/**
 * Helper functions stolen directly from blue-tape
 * Allows tape to test itself (whaaaa!?)
 */

function test (name, test, checkErrors) {
  tape.test(name, function (t) {
    var htest = tape.createHarness()
    htest.createStream().pipe(bl(function (_, data) {
      checkErrors && checkErrors(data.toString().split('\n'), t)
    }))
    htest(function (t) {
      return test(t, htest)
    })
  })
}

function verifyAsserts (counts) {
  return function (lines, t) {
    t.equal(count(lines, /^ok/), counts.ok, 'should have ' + counts.ok + ' ok asserts')
    t.equal(count(lines, /^not ok/), counts.fail, 'should have ' + counts.fail + ' failed asserts')
    t.end()
  }
}

function count (lines, regex) {
  var c = 0
  for (var k = 0; k < lines.length; ++k) {
    if (regex.test(lines[k])) {
      ++c
    }
  }
  return c
}
