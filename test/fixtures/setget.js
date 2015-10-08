"use strict";

var People = require('../../lib');

module.exports = function(test, done) {

    var obj = {};

    var path = 'foo/bar/baz';
    var val = 'boom';

    People.set(obj, path, val);

    test.deepEqual({ foo: { bar: { baz: val } } }, obj);

    test.equal(People.get(obj, path), val);

    People.separate('.');

    test.notEqual(People.get(obj, path), val, '#separate changes path separator for #get');

    People.set(obj, path, val);

    test.notDeepEqual({ foo: { bar: { baz: val } } }, obj, '#separate changes path separator for #set');

    done();

};

