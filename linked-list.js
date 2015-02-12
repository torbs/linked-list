/*jshint node:true,browser:true*/
'use strict';

var Node = require('./node');

function LinkedList(arr) {
    this.head = new Node(undefined, null, null);
    this.tail = null;
    this.length = 0;

    if (!arr) {
        return;
    }

    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        throw new Error('LinkedList expect an array as first parameter');
    }

    arr.forEach(function (item) {
        this.push(item);
    }.bind(this));
}

LinkedList.prototype.toString = function() {
    return 'LinkedList';
};

LinkedList.prototype.push = function(data) {
    var node = new Node(data);
    
    if (this.length === 0) {
        this.head.next = node;
        this.tail = node;     
    } else {
        node.previous = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
    this.length++;

    return this.length;
};

LinkedList.prototype.pop = function() {
    var node = this.tail;
    
    node.previous.next = null;
    
    this.tail = node.previous;
    this.length--;

    return node.value;
};

LinkedList.prototype.unshift = function(data) {
    var node = new Node(data);

    if (this.length === 0) {
        this.head.next = node;
        this.tail = node;
    } else {
        this.head.next.previous = node;
        node.next = this.head.next;
        this.head.next = node;
    }
    this.length++;

    return this.length;
};

LinkedList.prototype.shift = function() {
    var node = this.head.next;
    
    node.next.previous = null;
    
    this.head.next = node.next;
    this.length--;

    return node.value;
}

LinkedList.prototype.find = function(fn) {
    var next = this.head.next,
        value;

    if (typeof fn !== 'function') {
        value = fn;
        fn = function(val) {
            return val === value;
        }
    }

    while (next !== null) {
        if (fn(next.value)) {
            return next;
        }

        next = next.next;
    }
    return null;
};

LinkedList.prototype.toArray = function() {
    var ret = [],
        current = this.head;

    while (current.next) {
        current = current.next;
        ret.push(current.value);
    }

    return ret;
};

LinkedList.prototype.insertBefore = function(node, item) {
    var current = this.head,
        next    = current.next,
        n;

    while (next !== null) {
        if (next === node) {
            n = new Node(item, (current !== this.head ? current : null), next);
            next.previous = n;
            current.next = n;

            this.length++;
            break;
        }

        current = next;
        next = next.next;
    }
    return this;
};

LinkedList.prototype.insertAfter = function(node, item) {
    var next = this.head.next,
        n;

    while (next !== null) {
        if (next === node) {
            n = new Node(item, next, next.next);
            
            if (next.next !== null) {
                next.next.previous = n;
            }

            next.next = n;
            this.length++;
            break;
        }

        next = next.next;
    }
    return this;
};

LinkedList.prototype.insertAtIndex = function(item, index) {
    var current = this.head,
        next = current.next,
        i = 0,
        n;

    if (index < 0) {
        // insert from end
        return this.insertAtIndex.call(this, item, this.length + index);
    } else {
        while (next !== null && i++ !== index) {
            current = next;
            next = next.next;
        }

        n = new Node(item, next);

        if (current.next) {
            current.next.previous = n;
        }

        current.next = n;

        this.length++;
    }
    return this;
}

LinkedList.prototype.remove = function(node) {
    var current = this.head,
        next    = current.next;

    while (next !== null) {
        if (next === node) {
            current.next = next.next;
            next.previous = current.previous;
            break;
        }

        current = next;
        next = next.next;
    }

    return this;
};

module.exports = LinkedList;