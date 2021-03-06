'use strict';

var fs = require('fs');
var path = require('path');
var Writer = require('broccoli-writer');
var globby = require('globby');
var RSVP = require('rsvp');
var mkdirp = require('mkdirp');

var CssMyIcons = function CssMyIcons(inputTree, options) {
  if (!(this instanceof CssMyIcons)) {
    return new CssMyIcons(inputTree, options);
  }

  options = options || {};

  this.inputTree = inputTree;
  this.files = options.files || [];
  this.dest = options.dest || 'style.css';
  this.destDir = options.destDir || '';
  this.prefixPath = options.prefixPath || '';
};

CssMyIcons.prototype = Object.create(Writer.prototype);
CssMyIcons.prototype.Constructor = CssMyIcons;
CssMyIcons.prototype.write = function(readTree, destDir) {
  var self = this;

  return readTree(this.inputTree).then(function(srcDir) {
    return new RSVP.Promise(function(resolve, reject) {

      var fil = self.files.map(function(n) {
        return path.join(srcDir, n);
      });

      try {
        globby(fil, {}, function(err, files) {
          var icons = '';
          files.forEach(function(el) {
            icons += getCSS(el, self.prefixPath);
          });

          var dir = path.join(destDir, self.destDir);

          mkdirp(dir, function(err) {
            if (err) {
              throw new Error(err);
            } else {
              fs.writeFile(path.join(destDir, self.destDir, self.dest), icons, function() {
                resolve();
              });
            }
          });
        });
      } catch(e) {
        reject(e);
      }
    });
  });
};

var getCSS = function(el, prefix) {
  // Path
  var path = el.split('/'),
    file = path[path.length-1].split('.'),
    filenameNoExt = file[0],
    relativePath = prefix + el;
  return '.icon-' + filenameNoExt + '{background-image:url("' + relativePath + '");background-repeat:no-repeat;}';
};

module.exports = CssMyIcons;
