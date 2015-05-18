var assert = require('assert');

console.log('do not pollute node globals');
    var telegraph = 17;
    require('./index');
    assert.strictEqual(telegraph, 17);

    // emitter for tests
    var telegraph = require('./index');
    var emitter = {};
    assert.strictEqual(emitter, telegraph(emitter));

console.log('emiting one event listener');
    var event1count = 0;
    var event1handler = function() { event1count++; };
    assert.strictEqual(emitter, emitter.on('event1', event1handler));

    assert.strictEqual(true, emitter.emit('event1'));
    assert.equal(event1count, 1);

    assert.strictEqual(true, emitter.emit('event1'));
    assert.equal(event1count, 2);

    assert.strictEqual(emitter, emitter.off('event1', event1handler));
    assert.strictEqual(true, emitter.emit('event1'));
    assert.equal(event1count, 2);

console.log('emiting three event listeners');
    var event2count1 = 0;
    var event2count2 = 0;
    var event2count3 = 0;
    var event2handler1 = function() { event2count1++; };
    var event2handler2 = function() { event2count2++; };
    var event2handler3 = function() { event2count3++; };
    assert.strictEqual(emitter, emitter.on('event2', event2handler1));
    assert.strictEqual(emitter, emitter.on('event2', event2handler2));
    assert.strictEqual(emitter, emitter.on('event2', event2handler3));

    assert.strictEqual(true, emitter.emit('event2'));
    assert.equal(event2count1, 1);
    assert.equal(event2count2, 1);
    assert.equal(event2count3, 1);

    assert.strictEqual(true, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 2);
    assert.equal(event2count3, 2);

    assert.strictEqual(emitter, emitter.off('event2', event2handler1));
    assert.strictEqual(true, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 3);
    assert.equal(event2count3, 3);

    assert.strictEqual(emitter, emitter.off('event2', event2handler3));
    assert.strictEqual(true, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 4);
    assert.equal(event2count3, 3);

    assert.strictEqual(emitter, emitter.off('event2', event2handler2));
    assert.strictEqual(true, emitter.emit('event2'));
    assert.equal(event2count1, 2);
    assert.equal(event2count2, 4);
    assert.equal(event2count3, 3);

console.log('emiting one event listener and passing args to it');
    var event3count = 0;
    var event3handler = function(arg1) { assert.equal(arg1, 'one'); event3count++; };
    assert.strictEqual(emitter, emitter.on('event3', event3handler));

    assert.strictEqual(true, emitter.emit('event3', 'one'));
    assert.equal(event3count, 1);

    // listener expects an arg, so throws an error if you do not send one
    assert.throws(function() {
    assert.strictEqual(true, emitter.emit('event3'));
    },'AssertionError: "undefined" == "one"');

console.log('once function');
    var event4count = 0;
    var event4handler = function() { event4count++; };
    assert.strictEqual(emitter, emitter.once('event4', event4handler));

    assert.strictEqual(true, emitter.emit('event4'));
    assert.equal(event4count, 1);

    assert.strictEqual(true, emitter.emit('event4'));
    assert.equal(event4count, 1);

console.log('removing all listeners for an event');
    var event5count1 = 0;
    var event5count2 = 0;
    var event5count3 = 0;
    var event5handler1 = function() { event5count1++; };
    var event5handler2 = function() { event5count2++; };
    var event5handler3 = function() { event5count3++; };
    assert.strictEqual(emitter, emitter.on('event5', event5handler1));
    assert.strictEqual(emitter, emitter.on('event5', event5handler2));
    assert.strictEqual(emitter, emitter.on('event5', event5handler3));

    assert.strictEqual(true, emitter.emit('event5'));
    assert.equal(event5count1, 1);
    assert.equal(event5count2, 1);
    assert.equal(event5count3, 1);

    assert.strictEqual(emitter, emitter.off('event5'));
    assert.strictEqual(true, emitter.emit('event5'));
    assert.equal(event5count1, 1);
    assert.equal(event5count2, 1);
    assert.equal(event5count3, 1);

console.log('resetting');
    var event6count = 0;
    var event7count = 0;
    var event8count = 0;
    var event6handler = function() { event6count++; };
    var event7handler = function() { event7count++; };
    var event8handler = function() { event8count++; };
    assert.strictEqual(emitter, emitter.on('event6', event6handler));
    assert.strictEqual(emitter, emitter.on('event7', event7handler));
    assert.strictEqual(emitter, emitter.on('event8', event8handler));

    assert.strictEqual(true, emitter.emit('event6'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 0);
    assert.equal(event8count, 0);

    assert.strictEqual(true, emitter.emit('event7'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 1);
    assert.equal(event8count, 0);

    assert.strictEqual(true, emitter.emit('event8'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 1);
    assert.equal(event8count, 1);

    assert.strictEqual(emitter, telegraph(emitter));
    assert.strictEqual(true, emitter.emit('event6'));
    assert.strictEqual(true, emitter.emit('event7'));
    assert.strictEqual(true, emitter.emit('event8'));
    assert.equal(event6count, 1);
    assert.equal(event7count, 1);
    assert.equal(event8count, 1);

console.log('cancelling');
    var event9count = 0;
    var event9handler = function() { event9count++; };
    var event9cancelhandler = function() { return false; };
    assert.strictEqual(emitter, emitter.on('event9', event9handler));
    assert.strictEqual(emitter, emitter.on('event9', event9cancelhandler));
    assert.strictEqual(emitter, emitter.on('event9', event9handler));

    assert.strictEqual(false, emitter.emit('event9'));
    assert.equal(event9count, 1);

    assert.strictEqual(emitter, emitter.off('event9', event9cancelhandler));
    assert.strictEqual(true, emitter.emit('event9'));
    assert.equal(event9count, 3);

console.log('constructor paradigm');
    var event9count = 0;

    function Obj() {
        telegraph(this);
    }
    var obj = new Obj();

    var event9handler = function() { event9count++; };
    assert.strictEqual(obj, obj.on('event9', event9handler));

    assert.strictEqual(true, obj.emit('event9'));
    assert.equal(event9count, 1);

    assert.strictEqual(true, obj.emit('event9'));
    assert.equal(event9count, 2);

    assert.strictEqual(obj, obj.off('event9', event9handler));
    assert.strictEqual(true, obj.emit('event9'));
    assert.equal(event9count, 2);

(function() {
    console.log('mutate during emit');

    var emitter = telegraph();

    var i = 0;
    var count = function() { i++; };
    var countAndAdd = function() {
        i++;
        assert.strictEqual(emitter, emitter.on('mut', countAndAdd));
    };

    assert.strictEqual(emitter, emitter.on('mut', count));
    assert.strictEqual(emitter, emitter.on('mut', countAndAdd));

    assert.strictEqual(true, emitter.emit('mut'));
    assert.strictEqual(2, i);

    assert.strictEqual(true, emitter.emit('mut'));
    assert.strictEqual(5, i);

    assert.strictEqual(true, emitter.emit('mut'));
    assert.strictEqual(10, i);
})();
