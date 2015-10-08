"use strict";

var util = require('util');
var glob = require('glob');
var test = require('blue-tape');
var harness = require('apt-tap');
var reporter = require('apt-tap-basic');
var Promise = require('bluebird');

// To run specific tests, pass them along via command line.
// @example	> node test fixtureA fixtureB ...
//
var tests = process.argv.splice(2);

if(tests.length) {
    tests = tests.map(function(name) {
        return util.format('./fixtures/%s.js', name);
    });
} else {
    // Otherwise, run them all
    //
    tests = glob.sync(__dirname + '/fixtures/**/*.js');
}

// Tap into stream of tests, report, and pipe results to
// any writable stream.
//
test
    .createStream()
    .pipe(harness(reporter))
    .pipe(process.stdout);

 Promise.reduce(tests, function(prev, path) {

    return new Promise(function(resolve) {

        // test(path...)
        // #path is used here as the test name. You can change that.
        //
        test(path, function(t) {
            return Promise.promisify(require(path))(t).finally(resolve);
        });
    });

 }, []);
