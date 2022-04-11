let ident;

let socket = io();
//Get message from server.
socket.on('welcome', function(data) {
      ident = data.id;
      $("#messages").append('<li>' + data.message + " " + data.id + '</li>');
});

//Get message from server.
socket.on('update', (data) => {
      $("#messages").append('<li>' + data.user +": "+data.msg + '</li>');
});

function doit() {
//Send message to server.
      msg = $('#postT').val();
      user = $('#tempUser').val();
      pw = $('#password').val();
          $.ajax({
            url: "/check",
            type: "GET",
            data: {username:user,password:pw},
            success: function(data){
                if (data.error){
                  alert(data.message);
                }
                else {
                	socket.emit('update', {'msg': msg,'user':user});
                }
              } ,
            dataType: "json"
          });

      return false;
}
function showPassword() {
  var input = document.getElementById("password");
  if (input.type === "password") {
    input.type = "text";
  }
  else {
    input.type = "password";
  }
}

$(document).ready(function(){

});
