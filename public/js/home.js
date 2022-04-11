let ident;

let socket = io();
//Get message from server.
socket.on('welcome', function(data) {
      ident = data.id;
      $("#messages").append('<li>' + data.message + " " + data.id + '</li>');
});

//Get message from server.
socket.on('update', (data) => {
 let para = document.createElement("div");
if(data.msg == "")
 return;

$("#messages").append(
'<li>' + data.msg + " " + data.user + '</li>'+
"<button type="+ "button"+
" class="+ "collapsible"+
//"onclick=" +"collapseIt()"+
">Comments</button>"+

"<div class="+ "content"+"> " +"<hr>"
  +"<p>Lorem ipsum...</p>" +"<hr>"
+"</div>"
);
collapseIt();

});

function doit() {
//Send message to server.
      msg = $('#postT').val();
      socket.emit('update', {'msg': msg,'user':ident});
      return false;
}
function collapseIt(){
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
}
$(document).ready(function(){

});
