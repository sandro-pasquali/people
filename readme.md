## People

Manage an Object's population.

### Installation

```
npm install people
```

### Usage

```
var People = require('people');

var target = {};

People.set(target, 'foo/bar/baz', 'boom');
```

`target` is now:

```
{
    foo: {
        bar: {
            baz: 'boom'
        }
    }
}
```

To get:

```
People.get(target, 'foo/bar/baz');
```

Returns `boom`.

### Path format

Default is to use `/` as a path separator.

If you'd like to use another separator, use `separate`:

```
People.separate('.');

People.get(target, 'foo/bar/baz');
// not found

People.get(target, 'foo.bar.baz');
// 'boom'
```
