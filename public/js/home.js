let ident;

let socket = io();
//Get message from server.
socket.on('welcome', function(data) {
      ident = data.id;
      console.log(ident);
      $("#messages").append('<li>' + data.message + " " + data.id + '</li>');
});

//Get message from server.
socket.on('update', (data) => {
      $("#messages").append('<li>' + data.ident + '</li>');
});

function doit() {
//Send message to server.
      socket.emit('update', {'ident': ident});
      return false;
}

$(document).ready(function(){

});
