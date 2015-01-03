var expect = require('expect.js'),
    LinkedList = require('../linked-list.js');

describe('Linked list', function () {
    it('should create a linked list', function () {
        expect(new LinkedList().toString()).to.equal('LinkedList');
    });

    it('should have a empty head node', function () {
        expect(typeof new LinkedList().head.value).to.equal('undefined');
    });

    it('should push values to the end of the list', function () {
        var list = new LinkedList();

        list.push('a');

        expect(list.head.next).not.to.equal(null);
        expect(list.head.next.value).to.equal('a');
        expect(list.tail.value).to.equal('a');

        list.push('b');
        expect(list.head.next.value).to.equal('a');
        expect(list.head.next.next.value).to.equal('b');
        expect(list.tail.value).to.equal('b');
    });

    it('should unshift values to the start of the list', function () {
        var list = new LinkedList();

        list.unshift('a');

        expect(list.head.next).not.to.equal(null);
        expect(list.head.next.value).to.equal('a');
        expect(list.tail.value).to.equal('a');

        list.unshift('b');
        expect(list.head.next.value).to.equal('b');
        expect(list.head.next.next.value).to.equal('a');
        expect(list.tail.value).to.equal('a');
    });

    it('should pop a value off the list', function () {
        var list = new LinkedList(['a', 'b']);

        expect(list.tail.value).to.equal('b');
        expect(list.length).to.equal(2);

        var a = list.pop();

        expect(list.tail.value).to.equal('a');
        expect(list.length).to.equal(1);
        expect(list.tail.next).to.equal(null);
        expect(a).to.equal('b');
    });

    it('should shift a value off the list', function () {
        var list = new LinkedList(['a', 'b']);

        expect(list.tail.value).to.equal('b');
        expect(list.length).to.equal(2);

        var a = list.shift();

        expect(list.head.next.value).to.equal('b');
        expect(list.length).to.equal(1);
        expect(list.head.next.previous).to.equal(null);
        expect(a).to.equal('a');
    });

    it('should find a primitive value in the list', function () {
        var list = new LinkedList(['a','b','c']),
            node = list.find('b');

        expect(node).not.to.equal(null);
        expect(node.previous).not.to.equal(null);
        expect(node.next).not.to.equal(null);
        expect(node.value).to.equal('b');
        expect(node.next.value).to.equal('c');
        expect(node.previous.value).to.equal('a');
    });

    it('should find a value based on a function', function () {
        var list = new LinkedList([10,20,30]),
            val  = 15,
            node = list.find(function (c) {
                return (c > val);
            });

        expect(node).not.to.equal(null);
        expect(node.previous).not.to.equal(null);
        expect(node.next).not.to.equal(null);
        expect(node.value).to.equal(20);
        expect(node.next.value).to.equal(30);
        expect(node.previous.value).to.equal(10);
    });

    it('should insert a value before a node', function () {
        var list = new LinkedList([10,20,30]),
            val  = 15,
            node = list.find(function (c) {
                return (c > val);
            });

        list.insertBefore(node, 15);

        var n = list.find(15);
        expect(n.next.value).to.equal(20);
        expect(n.previous.value).to.equal(10);

        node = list.find(10);
        list.insertBefore(node, 5);
        n = list.find(5);
        expect(n.previous).to.equal(null);
        expect(n.next.value).to.equal(10); 
    });

    it('should insert a value after a node', function () {
        var list = new LinkedList([10,20,30]),
            val  = 15,
            node = list.find(function (c) {
                return (c > val);
            });

        list.insertAfter(node, 25);

        var n = list.find(25);
        expect(n.next.value).to.equal(30);
        expect(n.previous.value).to.equal(20);

        node = list.find(30);
        list.insertAfter(node, 45);
        n = list.find(45);
        expect(n.next).to.equal(null);
        expect(n.previous.next).to.equal(n);
        expect(n.previous.value).to.equal(30); 
    });

    it('should return the index of a value');
    it('should insert a value at an index');
    it('should remove a node at a specific index');
});