// setup port for online and local
// var PORT = process.env.PORT || 4000;

// setup url
var URL = 'https://websocket-rajon.herokuapp.com' || 'http://localhost:4000';

// make connection
var socket = io.connect(URL);


// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


// emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});



// keypress event
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});




// listen from events
// recieve messages back from backend/server
socket.on('chat', function(data){
    feedback.innerHTML = ''; // typing message stops
    output.innerHTML += '<p><strong>' + data.handle + '</strong>:' + data.message + '</p>';
});


// recieve typing/keypress event from server
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</p></em>';
});





