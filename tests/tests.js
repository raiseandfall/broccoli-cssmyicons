'use strict';

var cssMyIcons = require('../');
var expect = require('expect.js');
var broccoli = require('broccoli');
var fs = require('fs');
var path = require('path');

var builder;

describe('broccoli cssmyicons', function() {
  afterEach(function() {
    if (builder) {
      builder.cleanup();
    }
  });

  it('should generate a CSS file', function() {
    var tree = cssMyIcons('tests/fixtures', {
      files: ['*.svg'],
      dest: 'icons.css'
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(path.join(dir.directory, 'icons.css'), {encoding: 'utf8'});
      var expected = fs.readFileSync('tests/mocks/icons.css', {encoding: 'utf8'});
      expect(actual).to.equal(expected);
    });
  });

  it('should generate a CSS file in a destination directory', function() {
    var tree = cssMyIcons('tests/fixtures', {
      files: ['*.svg'],
      dest: 'icons.css',
      destDir: 'assets/style'
    });

    builder = new broccoli.Builder(tree);

    return builder.build().then(function(dir) {
      var actual = fs.readFileSync(path.join(dir.directory, 'assets/style/icons.css'), {encoding: 'utf8'});
      var expected = fs.readFileSync('tests/mocks/icons.css', {encoding: 'utf8'});
      expect(actual).to.equal(expected);
    });
  });
});
