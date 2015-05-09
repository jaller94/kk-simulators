var World = require("./world.class");

var world = new World();

for (var i = 1; i <= 625; i++) {
	world.act(world, i);
}
