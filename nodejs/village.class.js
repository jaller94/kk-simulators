// ES5 code

// constructor
function c(x, y) {
	x = x || 0;
	y = y || 0;

	// set object variables
	this.id = undefined;
	this.x = x;
	this.y = y;
	this.population = 0;
	this.eggdelay = 3;
	this.kidswalk = undefined;	
	this.anchestors = undefined;
	this.kidsvillage = undefined;
	this.children = [];
}

c.prototype.countkids = function () {
	var kids;

	// 42 is the size of a grown village
	// additional KKs don't belong here and are youngsters
	kids = (this.population || 0) - 42;
	kids = (kids > 0 ? kids : 0);

	return kids;
}

module.exports = c;