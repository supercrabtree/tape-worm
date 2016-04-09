var test = require('tape');
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

test('infect should add a method html to t', function (t) {
  t.equal(typeof t.html, 'function', 't.html is defined');
  t.end();
});


