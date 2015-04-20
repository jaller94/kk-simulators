var assert = require("assert");

var Village = require("./village.class");


var v1 = new Village();
var v2 = new Village(100.34,2023.64);

assert.equal(v1.x, 0);
assert.equal(v1.y, 0);
assert.equal(v1.eggdelay, 3);

assert.equal(v2.x, 100.34);
assert.equal(v2.eggdelay, 3);

// test countkids()
assert.equal(v1.countkids(), 0);
v1.population = 10;
assert.equal(v1.countkids(), 0);
v1.population = 42;
assert.equal(v1.countkids(), 0);
v1.population = 60;
assert.equal(v1.countkids(), 18);
v1.population = 84;
assert.equal(v1.countkids(), 42);
