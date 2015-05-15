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
		html_header(res, 'KK Directory');
		html_listall(res);
		html_footer(res);

	// overview - table
	} else if (req.url=="/table/") {
		res.writeHead(200, {'Content-Type': 'text/html'});
		html_header(res, 'Table | KK Directory');
		html_listall_table(res);
		html_footer(res);

	// specific village
	} else if(url_village.exec(req.url)) {
		var index = /\d+/.exec(req.url);
		res.writeHead(200, {'Content-Type': 'text/html'});
		html_header(res, 'Village '+index+' | KK Directory');
		res.write('<h1>Village '+index+'</h1><a href="/">to root</a><br>');
		html_village(res, index);
		html_footer(res);

	} else if(req.url=="/style.css") {
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write('table {border-collapse: collapse;} ');
		res.write('thead {background-color: lightgray;} ');
		res.write('ol,pre {margin: 0em;} ');
		res.write('pre {background-color: lightgray;} ');
		res.end('td {border: solid 1px gray;}');

	// unkown - 404
	} else {
		res.writeHead(404, {'Content-Type': 'text/html'});
		html_header(res, '404 Not found | KK Directory');
		res.write('<h1>404 Not found</h1><a href="/">to root</a>');
		html_footer(res);
	}
	res.end();
}).listen(8080);

function html_header(res, title) {
	res.write('<!DOCTYPE html><html>');
	res.write('<head><title>'+title+'</title>');
	res.write('<link rel="stylesheet" type="text/css" href="/style.css"></head>');
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

function td_NaN(res) {
	res.write('<td>NaN</td>')
}

function html_listall_table(res) {
	res.write('<table><thead><tr><td>Village</td><td>Children#</td>'+
		'<td>Ancestors</td><td>Hatching start</td><td>Kidswalk distance</td>'+
		'</tr></thead><tbody>');
	for (var i = 0; i < world.villagecount; i++) {
		var village = world.villages[i];
		res.write('<tr>');
		res.write('<td><a href="/village/'+i+'/">'+i+'</a></td>');
		try {res.write('<td>'+village.children.length+'</td>');}
		catch(e) {td_NaN(res);}
		try {
			var id = village.ancestors.id;
			res.write('<td><a href="/village/'+id+'/">'+id+'</a></td>');}
		catch(e) {td_NaN(res);}
		try {res.write('<td>'+village.kidswalk.starttick+'</td>');}
		catch(e) {td_NaN(res);}
		try {res.write('<td>'+village.kidswalk.totaldistance.toFixed(2)+'</td>');}
		catch(e) {td_NaN(res);}
		res.write('</tr>');
	};
	res.write('</tbody></table>');
}

function html_list_children(res, village) {
	res.write('<strong>children:</strong><ol>');
	village.children.forEach(function(child) {
		this.write('<li><a href="/village/'+child.id+'/">Village '+child.id+'</a></li>');
	}, res);
	res.write('</ol>');
}

function html_village(res, id) {
	try {
		var village = world.villages[id];

		res.write('<strong>x:</strong> '+village.x.toFixed(2)+'m<br>');
		res.write('<strong>y:</strong> '+village.y.toFixed(2)+'m<br>');
		try {
			var id = village.ancestors.id;
			res.write('<strong>ancestors:</strong> '+
				'<a href="/village/'+id+'/">Village '+id+'</a><br>');
		} catch(e) {
			res.write('no ancestors<br>');
		}

		html_list_children(res, village);

		res.write('<br><strong>raw data:</strong><pre>');
		res.write(util.inspect(village));
		res.write('</pre>');
	} catch(exception) {
		res.write('no village data');
	}
}