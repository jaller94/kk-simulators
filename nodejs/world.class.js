// ES5 code
// initialize local class table
var c = {};

// imports
require("./math-additions");
var Village = require("./village.class");


c.act = function() {
	this.tick++;

	// act in each village
	this.villages.forEach(function(village, index, villages) {
		/* DEBUG
		if (village.population != 0) {
			console.log("act: village("+index+") population("+village.population+")");
			console.log(village.kidsvillage === undefined && village.population == 42);
			console.log(village.kidsvillage);
		}
		*/

		// start hatching
		// requires:
		//   42 KKs in the village and no hatching in progress and
		//   an empty village in the world
		if (village.population == 42 && village.kidsvillage === undefined &&
				this.nextvillage <= this.villagecount) {
			village.kidsvillage = this.nextvillage;
			this.nextvillage++;
			console.log("started hatching!");
		}

		// reproduction
		// only possible with 2 KKs and a destination village
		if (village.kidsvillage !== undefined && village.population >= 2) {
			// eggs need 3 months to hatch
			// this prevents eggs to hatch in the first 3 months of a village
			if (village.eggdelay > 0) {
				village.eggdelay--;
			} else {
				village.population++;
			}
		}

		// kids leave the village
		if (village.population == 84) {
			// kids complete
			var destination = this.villages[village.kidsvillage];
			destination.anchestors = village;
			village.children.push(destination);
			
			// kids need time to walk to their village
			var x1 = village.x;
			var y1 = village.y;
			var x2 = destination.x;
			var y2 = destination.y;
			var xd = x2 - x1;
			var yd = y2 - y1;
			var length = Math.sqrt(xd*xd + yd*yd);

			this.addkidswalk(destination, length);
			console.log(this.tick +"\tKids " + village.kidsvillage + " gestartet!");

			// village is ready to hatch for another village
			village.population = 42;
			village.kidsvillage = undefined;
		}
	}, this);

	// kids walk
	this.kidswalks.forEach(function(walk, index, walks) {
		console.log("walk ongoing:\t"+walk.destination.id+"\t"+walk.leng)
		walk.leng = walk.leng -1000;
		if (walk.leng <= 0) { //KKs arrived
			walk.destination.population = 42;
			console.log(this.tick +"\tDorf " + walk.destination.id + " besiedelt!");
			walks.splice(index, 1); //remove finished walk
		}
	}, this);
}

c.addkidswalk = function(destination, length) {
	var walk = {};
	walk.destination = destination;
	walk.leng = length;
	this.kidswalks.push(walk);
}

function construct() {
	// set object variables
	this.tick = 0;
	this.villages = [];
	this.kidswalks = [];
	this.nextvillage = 1;
	this.villagecount = 7650;

	// Erstelle Urvillage
	var village = new Village(0, 0, 0);
	village.population = 42;
	this.villages.push(village);

	var id = 1;
	// Erstelle alle anderen Dörfer
	for (var i = 1; i <= 50; i++) {
		for (var i2 = 0; i2 < (i*6); i2++) {
			// circular
			//var x = Math.sin(Math.radians(i2/(i*6)*360))*300*i
			//var y = Math.cos(Math.radians(i2/(i*6)*360))*300*i

			var line = Math.floor(i2/i);
			var inline = Math.floor(i2%i);
			//console.log(line, inline);
			var x = Math.sin(Math.radians(line/6*360))*300*i;
			var y = Math.cos(Math.radians(line/6*360))*300*i;
			x = x + Math.sin(Math.radians((line+2)/6*360))*300*inline;
			y = y + Math.cos(Math.radians((line+2)/6*360))*300*inline;

			this.villages.push(new Village(id, x, y));

			id++;
		}
	}

	// attach prototype to object
	this.act = c.act;
	this.addkidswalk = c.addkidswalk;
}

module.exports = construct;