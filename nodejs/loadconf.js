var fs = require('fs');

var settings;

try {
	settings = JSON.parse(fs.readFileSync('settings.json'));
} catch (e) {
	console.log('Failed while trying to read settings.json!');
	console.log(e);
	settings = {
		"error" : true
	};
}

module.exports = settings;