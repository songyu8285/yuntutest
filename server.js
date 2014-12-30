#!/bin/env node

var express = require('express');
var fs      = require('fs');

var App = function(){

  // Scope
  var self = this;

  // Setup
  self.ipaddr  = process.env.OPENSHIFT_NODEJS_IP;
  self.port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;
  if (typeof self.ipaddr === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP environment variable');
  };


  // Web app logic
  self.routes = {};
  
  //default response with info about app URLs
  self.routes['root'] = function(req, res){ 
    res.send("<!doctype html><html><head><meta name='yuntu' content='b4ad411cbb966fe6dd4430b84ea8247a'/></head><body>Hello Yuntu!</body></html>"); 
  };


  // Web app urls
  self.app  = express();


  //define all the url mappings
  self.app.get('/', self.routes['root']);

  
  //starting the nodejs server with express
  self.startServer = function(){
    self.app.listen(self.port, self.ipaddr, function(){
      console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddr, self.port);
    });
  }

  // Destructors
  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);
      process.exit(1);
    };
    console.log('%s: Node server stopped.', Date(Date.now()) );
  };

  process.on('exit', function() { self.terminator(); });

  self.terminatorSetup = function(element, index, array) {
    process.on(element, function() { self.terminator(element); });
  };

  ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'].forEach(self.terminatorSetup);

};

//make a new express app
var app = new App();

//call the connectDb function and pass in the start server command
app.startServer();
