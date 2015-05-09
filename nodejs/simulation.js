var Village = require("./village.class");

var m = {};
module.exports = m;


// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};


m.new_world = function() {
	console.log("generating world...");
	var world = {};

	world.kidswalks = [];
	
	world.add_kidswalk = function(destination, length) {
		var walk = {};
		walk.destination = destination;
		walk.leng = length;
		this.kidswalks.push(walk);
	}
	
	// Erstelle Urvillage
	var village = new Village(0, 0);
	village.population = 42;
	world[1] = village;

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

			world[id] = new Village(x, y);

			id++;
		}
	}

	// village 1 is settled and is currently hatching for village 2
	// next up for hatching will be village 3
	world.nextvillage = 2;
	
	console.log("world finished!");

	return world;
}

m.step = function(world, step) {
	var step = step || 0;
	for (var i = 1; i <= 7651; i++) {
		var village = world[i];

		// start hatching
		if (village.kidsvillage == null && village.population == 42) {
			// check if there still is an empty village in this world
			if (world.nextvillage <= 7651) {
				village.kidsvillage = world.nextvillage;
				world.nextvillage++;
			}
		}

		// reproduction
		// only possible with 2 KKs and a destination village
		if (village.kidsvillage != null && village.population >= 2) {
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
			
			// kids need time to walk to their village
			var x1 = village.x;
			var y1 = village.y;
			var x2 = world[village.kidsvillage].x;
			var y2 = world[village.kidsvillage].y;
			var xd = x2 - x1;
			var yd = y2 - y1;
			var length = Math.sqrt(xd*xd + yd*yd);

			world.add_kidswalk(village.kidsvillage, length);
			console.log(step +"\tKids " + village.kidsvillage + " gestartet!");

			// village is ready to hatch for another village
			village.population = 42;
			village.kidsvillage = null;
		}
	}

	// kids walk
	var finished = [];
	for (var walk in world.kidswalks) {
		//console.log("walk ongoing:\t"+walk.destination+"\t"+walk.leng)
		walk.leng = walk.leng -1000;
		if (walk.leng <= 0) {
			world[walk.destination].population = 42;
			print(step +"\tDorf " + walk.destination + " besiedelt!");
			finished.push(k);
		}
	}

	// remove finished walks
	for (var v in finished) {
		world.kidswalks[v] = null;
	}
}
