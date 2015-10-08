"use strict";

// Methods to set/get deep values in objects.
//
// eg. Accessor.set({}, '/foo/bar/', 'baz');
//    =>  {
//        foo: {
//            bar: "baz"
//        }
//      }
//
//    Access.get('/foo/bar') => "baz"
//

// The default separator.
// @see Accessor#separator
//
var separator = '/';

function prep(path) {
    return typeof path === 'string'
        ? path.trim().split(separator)
        : [];
}

var Accessor = {

    // Set a value
    //
    // @param {Object} ob		The object to set a value on.
    // @param {String} path		A path, such as 'foo/bar/baz'.
    // @param {Mixed} val		Value to set
    //
    set : function set(ob, path, val) {

        var i = 0;
        var p;
        var props = prep(path);
        var pL = props.length;

        while(i < (pL -1)) {
            p 	= props[i];
            ob 	= ob[p] = typeof ob[p] === "object" ? ob[p] : {};
            i++;
        }

        ob[props[i]] = val;
    },

    // Get a value
    //
    // @param {Object} ob		The object to get a value from.
    // @param {String} path		A path, such as 'foo/bar/baz'.
    //
    get : function get(ob, path) {

        var i = 0;
        var props = prep(path);
        var pL = props.length;

        while((ob = ob[props[i]]) && ++i < pL) {};

        return ob;
    },

    // Set default separator
    //
    // @param {String} sep  The character that separates access paths.
    //
    separate : function separate(sep) {
        if(typeof sep !== 'string') {
            throw new Error('#separator expects a String value');
        }
        separator = sep;
    }
};

module.exports = Accessor;