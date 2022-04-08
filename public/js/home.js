let ident;

let socket = io();
//Get message from server.
socket.on('welcome', function(data) {
      ident = data.message;
      console.log(ident);
      //$("#messages").append('<li>' + data.message + " " + data.id + '</li>');
});

//Get message from server.
socket.on('update', (data) => {
    console.log(data.ident);
});

function doit() {
//Send message to server.
    ident = $("#chat").val();
    const p = document.createElement("li");
      p.append(ident);
      $("#messages").append(p);
      socket.emit('update', {'ident': ident});
      return false;
}

$(document).ready(function(){

});
