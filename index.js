// setup port for online and local
var PORT = process.env.PORT || 4000;

// app setup
var express = require('express');
var socket = require('socket.io');


// app setup
var app = express();


// setup server
var server = app.listen(PORT, function(){
    console.log('you are listening to port ' + PORT);
});


// static files
app.use(express.static('public'));


// socket setup
var io = socket(server);


// connection event
io.on('connection', function(socket){
    console.log('made socket connection!', socket.id);
    
    // emitting the chat message to all
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

// keypress event handler
socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
});

});