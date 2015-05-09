var http = require('http');
var util = require('util');

// gen world
var World = require("./world.class");

var world = new World();

for (var i = 1; i <= 625; i++) {
	world.act(world, i);
}


var url_village = /\/village\/\d+/

http.createServer(function (req, res) {
	// overview - list
	if (req.url=="/") {
		res.writeHead(200, {'Content-Type': 'text/html'});
		html_header(res, "KK Directory");
		html_listall(res);
		html_footer(res);

	// specific village
	} else if(url_village.exec(req.url)) {
		var index = /\d+/.exec(req.url);
		res.writeHead(200, {'Content-Type': 'text/html'});
		html_header(res, 'Village '+index+' | KK Directory');
		res.write('<h1>Village '+index+'</h1><a href="/">to root</a><br>');
		html_village(res, index);
		html_footer(res);

	// unkown - 404
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		html_header(res, "404 Not found | KK Directory");
		res.write('<h1>404 Not found</h1><a href="/">to root</a>');
		html_footer(res);
	}
	res.end();
}).listen(8080);

function html_header(res, title) {
	res.write('<!DOCTYPE html><html>');
	res.write('<head><title>'+title+'</title></head>');
	res.write('<body>');
}

function html_footer(res) {
	res.end('</body></html>');
}

function html_listall(res) {
	for (var i = 0; i < world.villagecount; i++) {
		res.write('<a href="/village/'+i+'/">Village '+i+'</a><br>');
	};
}

function html_village(res, id) {
	try {
		var village = world.villages[id];
		res.write('<pre>');
		res.write(util.inspect(village));
		res.write('</pre>');
	} catch(exception) {
		res.write('no village data');
	}
}