/*jslint node: true*/
"use strict";

var fs = require('fs');
var path = require('path');
var S = require('string');

function uriToFilename(uri, base) {
    var filename = path.join(base, uri);
    // Make sure filename ends with '/'  if filename exists and is a directory.
    try {
        var fileStats = fs.statSync(filename);
        if (fileStats.isDirectory() && !S(filename).endsWith('/')) {
            filename += '/';
        } else if (fileStats.isFile() && S(filename).endsWith('/')) {
            filename = S(filename).chompRight('/').s;
        }
    } catch (err) {}
    return filename;
}

function uriToRelativeFilename(uri, base) {
    var filename = uriToFilename(uri, base);
    var relative = path.relative(base, filename);
    return relative;
}

function filenameToBaseUri(filename, uri, base) {
    var uriPath = S(filename).strip(base).toString();
    return uri + '/' + uriPath;
}


exports.uriToFilename = uriToFilename;
exports.uriToRelativeFilename = uriToRelativeFilename;
exports.filenameToBaseUri = filenameToBaseUri;
