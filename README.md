Telegraph
=============

![Build status](https://travis-ci.org/dubrowgn/telegraph.svg?branch=master)

A minimal event emitter for browsers, forked from Benjamin Thomas' [smokesignals.js][1].

This library has three goals:

1. Make it easy and intuitive to listen for and initiate events on an object.
2. Be as small as possible. Right now the minified version comes in at 528 bytes.
3. Capability for handlers to cancel the event process.

There are many other [wonderful libraries that do similar things][2], but none
of them worked exactly how I wanted them to work or met all the goals above.

Installing
----------

Just download `telegraph.js` and put it in a place you can access from your webpage.

Loading
-------

Just include the Telegraph script:

```html
<script src="telegraph.js"></script>
```

Using
-----

Make any object an event emitter:

```javascript
var jill = {};
telegraph(jill);

// or...
var jill = telegraph();
```

Or if you prefer constructors:

```javascript
function Person() {
    telegraph(this);
}
var jill = new Person();
```

Now you can listen for events:

```javascript
function listener(name) {
    window.alert('Hello ' + name + '!');
}
jill.on('say hello', listener);
```

And emit events:

```javascript
jill.emit('say hello', 'Jack');
// alerts: "Hello Jack!"
// returns: true
```

And remove a listener:

```javascript
jill.off('say hello', listener);
```

Or if you only want to listen for an event once:

```javascript
jill.once('another event', function() {
    window.alert("I'll only be called once!");
});
jill.emit('another event');
```

Or remove all listeners for an event:

```javascript
jill.off('say hello');
```

Or if you want to remove ALL listeners:

```javascript
// just call off() with no parameters
jill.off();

// or reconvert the object...
telegraph(jill);
```

Or if you want to cancel the event chain:

```javascript
// just return false from a handler
jill.on('event', function() { return false; });
jill.on('event', function() { console.log('event!'); });

// emit now returns false, and 'event!' is not printed
jill.emit('event');
```

That's it! One global object (`telegraph`) and when used it adds 4 methods to
your objects (`on`, `once`, `off` and `emit`).

By the way, all methods, except for `emit`, are chainable:

```javascript
var jill = telegraph()
    .on('event one', function() { ... })
    .on('event two', function() { ... })
    .once('event three', function() { ... })
    .off ('event one');
```

[1]: https://bitbucket.org/bentomas/smokesignals.js
[2]: http://microjs.com/#events
