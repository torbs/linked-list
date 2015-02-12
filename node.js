/*jshint node:true,browser:true*/
'use strict';

function Node(value, previous, next) {
    this.value = value;
    this.next = next || null;
    this.previous = previous || null;
}

module.exports = Node;