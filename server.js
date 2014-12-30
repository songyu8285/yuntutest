var http = require('http');
var url = require('url');
var fs = require('fs');
var queryString = require("querystring");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

http.createServer(function (req, res) {
    var fileStr = fs.readFileSync('./index.html', 'utf8');
    res.end(fileStr);
}).listen(server_port);
console.log('listenning port 80');

