# Api

_Generated using [Javadoc to Markdown](https://delight-im.github.io/Javadoc-to-Markdown/)_

## `telegraph = function (obj)`

Converts the passed object, or a new object, into an event emitter

 * **Parameters:** `obj` — `object` — The object to convert
 * **Returns:** `object` — The passed object for chaining

## `obj.on = function (eventName, handler, front)`

Add a listener

 * **Parameters:**
   * `eventName` — `string` — The name of the event
   * `handler` — `function` — The handler function for the event
   * `front` — `boolean` — Handler is inserted at the front of the call chain when true
 * **Returns:** `object` — This object for chaining

## `obj.once = function (eventName, handler, front)`

Add a listener that will only be called once

 * **Parameters:**
   * `eventName` — `string` — The name of the event
   * `handler` — `function` — The handler function for the event
   * `front` — `boolean` — Handler is inserted at the front of the call chain when true
 * **Returns:** `object` — This object for chaining

## `obj.off = function (eventName, handler)`

Remove a listener. Remove all listeners for eventName if handler is omitted. Remove all listeners for all event names if eventName is also omitted.

 * **Parameters:**
   * `eventName` — `string` — The name of the event
   * `handler` — `function` — The handler function for the event
 * **Returns:** `object` — This object for chaining

## `obj.emit = function (eventName)`

Dispatches the named event, calling all registered handler functions. If any handler returns false, the event subsequent handlers are not called and false is returned; Otherwise, all handlers are called and true is returned.

 * **Parameters:** `eventName` — `string` — The name of the event to dispatch
 * **Returns:** `boolean` — False if any handler returns false, true otherwise.