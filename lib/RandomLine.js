const _ = require('lodash');
const fs = require('fs');
const http = require('http');
const fileName = __dirname + '/../file.log';
const contentType = 'text/xml';

const PORT = 8080;

function RandomLine() {

}

const p = RandomLine.prototype;

p.start = function() {
	this._readFile();
	this._listenToPort();
};

p._readFile = function() {
	console.log('Reading file ' + fileName + '...');
	this._data = fs.readFileSync(fileName, 'utf-8').split('\n');
	this._rowsNumber = this._data.length;
};

p._listenToPort = function() {
	const server = http.createServer(_.bind(this._onRequest, this));
	server.listen(PORT, function(){
		console.log('Server listening on: http://localhost:%s', PORT);
	});
};

p._onRequest = function(req, res) {
	const rowNum = Math.floor(Math.random() * (this._rowsNumber));
	res.writeHead(200, {
			'Content-Type': contentType
		});
	res.end(this._data[rowNum]);
};

module.exports = RandomLine;