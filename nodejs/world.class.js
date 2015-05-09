// ES5 code
// initialize local class table
var c = {};

// imports
require("./math-additions");
var Village = require("./village.class");


c.act = function() {
	//TODO
}

c.addkidswalk = function(destination, length) {
	var walk = {};
	walk.destination = destination;
	walk.len = length;
	this.kidswalks.push(walk);
}

function construct() {
	// set object variables
	this.tick = 0;
	this.villages = [];
	this.kidswalks = [];
	this.nextvillage = 2;

	// Erstelle Urvillage
	var village = new Village(0, 0);
	village.population = 42;
	this.villages.push(village);

	var id = 2;
	// Erstelle alle anderen Dörfer
	for (var i = 1; i <= 50; i++) {
		for (var i2 = 0; i2 < (i*6); i2++) {
			// circular
			//var x = Math.sin(Math.radians(i2/(i*6)*360))*300*i
			//var y = Math.cos(Math.radians(i2/(i*6)*360))*300*i

			var line = Math.floor(i2/i);
			var inline = Math.floor(i2%i);
			console.log(line, inline);
			var x = Math.sin(Math.radians(line/6*360))*300*i;
			var y = Math.cos(Math.radians(line/6*360))*300*i;
			x = x + Math.sin(Math.radians((line+2)/6*360))*300*inline;
			y = y + Math.cos(Math.radians((line+2)/6*360))*300*inline;
			console.log(id,x,y);

			this.villages.push(new Village(x, y));

			id++;
		}
	}

	// attach prototype to object
	this.act = c.act;
	this.addkidswalk = c.addkidswalk;
}

module.exports = construct;