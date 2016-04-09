![tapeworm](https://raw.githubusercontent.com/supercrabtree/tape-worm/master/media/tape-worm-header.jpg)

Tapeworm allows you to use the full power of the DOM when testing in the browser using [tape](https://github.com/substack/tape).

Tapeworm adds four features to tape.

1. Spits the test results into the DOM.
2. Colors the background, green for passing, red for failing, yellow for pending.
3. Colors the favicon, green for passing, red for failing, yellow for pending.
4. Adds an `t.html` method, where you can inject any arbitrary html into the DOM.

# Screenshots
#### Passing
![passing-test-screenshot](https://raw.githubusercontent.com/supercrabtree/tape-worm/master/media/passing-screenshot.png)

#### Failing
![passing-test-screenshot](https://raw.githubusercontent.com/supercrabtree/tape-worm/master/media/failing-screenshot.png)

# t.html
This is the main reason that tapeworm exists. By allowing you to add your own html you gain a really powerful test reporter.

Take these two images for example:

![two-worms](https://raw.githubusercontent.com/supercrabtree/tape-worm/master/media/two-worms.jpg) ![one-worm](https://raw.githubusercontent.com/supercrabtree/tape-worm/master/media/one-worm.jpg)

We can write a simple test using [Resemble.js](https://github.com/Huddle/Resemble.js) to diff the images.

```js
test('the worm images should look the same', function (t) {

  t.plan(1);

  resemble('two-worms.jpg').compareTo('one-worm.jpg')
    .onComplete(function (imgDiffResult) {

      var pass = imgDiffResult.rawMisMatchPercentage === 0;

      if (!pass) {
        var base64DiffData = imgDiffResult.getImageDataUrl();
        t.html('<img src="' + base64DiffData + '">');
      }

      t.equal(pass, true, 'the images are the same');
    });
});
```

And now we have image diffs in our output, whoop!

![diff-worms](https://raw.githubusercontent.com/supercrabtree/tape-worm/master/media/img-diff-screenshot.png)