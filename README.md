# CSS my icons  [![Build Status](https://travis-ci.org/raiseandfall/broccoli-cssmyicons.svg)](https://travis-ci.org/raiseandfall/broccoli-cssmyicons)

> Broccoli plugin to generate a CSS file for SVG icons used as background-image:

```css
.icon-home{background-image:url('icons/home.svg');background:no-repeat;}
```

> There's also a [grunt version](https://github.com/raiseandfall/grunt-cssmyicons)

## [CHANGELOG](./CHANGELOG.md)

## INSTALL

```shell
$ npm install broccoli-cssmyicons
```

## USAGE
```javascript
var cssMyIcons = require('broccoli-cssmyicons');

var tree = cssMyIcons(app, {
  files: ['*.svg'],
  dest: 'icons.css'
});
```

## OPTIONS

### cssMyIcons(tree, options)

#### options.files
Type: `Array` 
_Required_

This option is the glob of the svg folders.

#### options.dest
Type: `String` 
_Optional_
_Default_ style.css

Path to the CSS file to export to.

## CONTRIBUTE
```shell
$ npm run test
```