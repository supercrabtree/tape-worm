var test = require('tape');
var sinon = require('sinon');
var tapeworm = require('../');

tapeworm.infect(test);

test('infect should inject a custom favicon into the DOM', function (t) {
  var favicon = document.querySelector('link[rel="icon"]');
  var faviconHref = favicon.getAttribute('href');

  t.equal(true, !!favicon, 'favicon element exists');
  t.equal(
    true,
    /^data:image\/png;base64,/.test(faviconHref),
    'favicon href is a base64 png'
  );
  t.end();
});

test('infect should change the style of the body', function (t) {
  var s = document.body.style;
  t.equal(true, !!s.backgroundColor, 'backgroundColor is changed');
  t.equal(true, !!s.borderTopWidth, 'borderTopWidth is changed');
  t.equal(true, !!s.borderTopStyle, 'borderTopStyle is changed');
  t.equal(true, !!s.margin, 'margin is changed');
  t.end();
});

test('infect should add a method html to t', function (t) {
  t.equal(typeof t.html, 'function', 't.html is defined');
  t.end();
});

test('t.html should call console log', function (t) {
  sinon.spy(console, 'log');
  t.html('<div></div>');
  t.equal(1, console.log.callCount);
  t.end();
  console.log.restore();
});

test('t.html should inject html into the DOM', function (t) {
  t.html('<div id="silly-hat"></div>');
  t.equal(true, !!document.getElementById('silly-hat'));
  t.end();
});
