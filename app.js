var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var favicon = require('serve-favicon')
var number = 0;
var express = require("express");
app.use(express.static( __dirname + "/public/"));
app.use(favicon(__dirname +'/public/favicon.ico'));



app.get('/', function(req, res){
  res.sendfile(__dirname +'index.html');
});

io.on('connection', function (socket) {
    console.log('a new user connected');
    io.emit('connect', "fgfg");
    socket.on('disconnect', function (socket) {
        console.log('a user disconnected');
    });

});



io.on('connection', function (socket) {

    socket.on('setName', function (name) {
        console.log(name.nameFrom + " to " +name.nameTo);
        io.emit('setName', name);
    });
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});