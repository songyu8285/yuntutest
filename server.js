var http = require('http');
var url = require('url');
var fs = require('fs');
var queryString = require("querystring");



http.createServer(function (req, res) {
    var fileStr = fs.readFileSync('./index.html', 'utf8');
    res.end(fileStr);
}).listen(80);
console.log('listenning port 80');
