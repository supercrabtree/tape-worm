var test = require('tape');
var sinon = require('sinon');
var tapeworm = require('../');

test('tape should not already have a method html', function (t) {
  t.equal(test.html, undefined);
  t.end();
});

tapeworm.infect(test);

test('infect should add a method html to t', function (t) {
  t.equal(typeof t.html, 'function', 't.html is defined');
  t.end();
});


/**
 * Skip below tests if document global is not availible
 */

test('infect should inject a custom favicon into the DOM', {skip: !document}, function (t) {
  var favicon = document.querySelector('link[rel="icon"]');
  var faviconHref = favicon.getAttribute('href');

  t.equal(!!favicon, true, 'favicon element exists');
  t.equal(
    /^data:image\/png;base64,/.test(faviconHref),
    true,
    'favicon href is a base64 png'
  );
  t.end();
});

test('infect should change the style of the body', {skip: !document}, function (t) {
  var s = document.body.style;
  t.equal(!!s.backgroundColor, true, 'backgroundColor is changed');
  t.equal(!!s.borderTopWidth, true, 'borderTopWidth is changed');
  t.equal(!!s.borderTopStyle, true, 'borderTopStyle is changed');
  t.equal(!!s.margin, true, 'margin is changed');
  t.end();
});

test('t.html should call console log', {skip: !document}, function (t) {
  sinon.spy(console, 'log');
  t.html('<div></div>');
  t.equal(console.log.callCount, 1);
  t.end();
  console.log.restore();
});

test('t.html should inject html into the DOM', {skip: !document}, function (t) {
  t.html('<div id="silly-hat"></div>');
  t.equal(!!document.getElementById('silly-hat'), true);
  t.end();
});
