/**
 * Converts the passed object, or a new object, into an event emitter
 * @param {object} obj The object to convert
 * @returns {object} The passed object for chaining
 */
telegraph = function (obj) {
    'use strict';

    obj = obj || {};

    // we store the list of handlers as a local variable inside the scope so
    // that we don't have to add random properties to the object we are
    // wrapping. (prefixing variables in the object with an underscore or two is
    // an ugly solution)
    var handlers = {};

    /**
     * Add a listener
     * @param {string} eventName The name of the event
     * @param {function} handler The handler function for the event
     * @param {boolean} front Handler is inserted at the front of the call chain when true
     * @returns {object} This object for chaining
     */
    obj.on = function (eventName, handler, front) {
        // either use the existing array or create a new one for this event
        (handlers[eventName] = handlers[eventName] || [])
            // add the handler to the array
            [front ? 'unshift' : 'push'](handler);

        return obj;
    };

    /**
     * Add a listener that will only be called once
     * @param {string} eventName The name of the event
     * @param {function} handler The handler function for the event
     * @param {boolean} front Handler is inserted at the front of the call chain when true
     * @returns {object} This object for chaining
     */
    obj.once = function (eventName, handler, front) {
        // create a wrapper listener, that will remove itself after it is called
        function wrappedHandler() {
            // remove ourself, and then call the real handler with the args
            // passed to this wrapper
            handler.apply(obj.off(eventName, wrappedHandler), arguments);
        }

        // in order to allow that these wrapped handlers can be removed by
        // removing the original function, we save a reference to the original
        // function
        wrappedHandler.h = handler;

        // call the regular add listener function with our new wrapper
        return obj.on(eventName, wrappedHandler, front);
    };

    /**
     * Remove a listener. Remove all listeners for eventName if handler is
     * omitted. Remove all listeners for all event names if eventName is also
     * omitted.
     * @param {string} eventName The name of the event
     * @param {function} handler The handler function for the event
     * @returns {object} This object for chaining
     */
    obj.off = function (eventName, handler) {
    	// if no eventName, clear all event handlers for all events
    	if (eventName === undefined) {
    		handlers = {};
    		return obj;
    	} // if

        // loop through all handlers for this eventName to see if the handler
        // passed in was any of them so we can remove it
        //		if no handler, clear all handlers for the event instead
        var list = handler ? handlers[eventName] || [] : [];
        for (var i = 0; i < list.length; i++) {
            // either this item is the handler passed in, or this item is a
            // wrapper for the handler passed in.  See the 'once' function
            if (list[i] === handler || list[i].h === handler)
                list.splice(i--, 1);
        } // for( i )

        // cleanup if no events for the eventName
        if (!list.length) {
            // remove the array for this eventname (if it doesn't exist then
            // this isn't really hurting anything)
            delete handlers[eventName];
        } // if

        return obj;
    };

    /**
     * Dispatches the named event, calling all registered handler functions. If
     * any handler returns false, the event subsequent handlers are not called
     * and false is returned; Otherwise, all handlers are called and true is
     * returned.
     * @param {string} eventName The name of the event to dispatch
     * @returns {boolean} False if any handler returns false, true otherwise.
     */
    obj.emit = function (eventName) {
        // loop through all handlers for this event name and call them all
        //		arguments is "array-like", so call slice() from list instead
        //		handlers can return false to cancel event
        var list = handlers[eventName] || [];
        var args = list.slice.call(arguments, 1);
        for (var i = 0; i < list.length; ++i) {
            if (list[i].apply(obj, args) === false)
                return false;
        } // for( i )

        return true;
    };

    return obj;
} // telegraph( )
