var World = require("./world.class");

var world = new World();

for (var i = 1; i <= 625; i++) {
	world.act(world, i);
}


// switch to CLI mode
var readline = require('readline');


var rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('village> ');
rl.prompt();


rl.on('line', function(line) {
	var num = parseInt(line);
	console.log(world.villages[num]);
	rl.prompt();
}).on('close', function() {
	console.log('Have a great day!');
	process.exit(0);
});