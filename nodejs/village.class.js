// ES5 code
// initialize local class table
var c = {};

c.countkids = function () {
	var kids;

	// 42 is the size of a grown village
	// additional KKs don't belong here and are youngsters
	kids = (this.population || 0) - 42;
	kids = (kids > 0 ? kids : 0);

	return kids;
}

function construct(id, x, y) {
	x = x || 0;
	y = y || 0;

	console.log(id,x,y);

	// set object variables
	this.id = id;
	this.x = x;
	this.y = y;
	this.population = 0;
	this.eggdelay = 3;

	this.children = [];
	this.anchestors = undefined;

	// attach prototype to object
	this.countkids = c.countkids;
}

module.exports = construct;