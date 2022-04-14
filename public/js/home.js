let ident;
let messageid = 1;
let socket = io();
//Get message from server.
socket.on('welcome', function(data) {
      ident = data.id;
      //$("#messages").append('<p>' + data.message + " " + data.id + '</p>');
});

//Get message from server.
socket.on('update', (data) => {
 let para = document.createElement("div");
if(data.msg == "")
 return;
let message =  messageid.toString();
let user = data.user.toString();
let abc = " ";
$("#messages").append(

"<fieldset>"+
'<p>'+ " Username: " + user +" "+  data.msg + '</p>'+

"<button type="+ "button"+
" class="+ "collapsible"+
" id =" + messageid +
//"onclick=" +"collapseIt()"+
">Comments</button>"+

"<div id =" + "d"+ messageid + " class="+ "content"+"> " +"<hr>"
  +"<ul id=" + "p"+ messageid + "></ul>" + "<br>"
  + "<input id =" + "t" + messageid + " type="+ "text"+">"
  +"<input id =" + "c"+ messageid + " type=button name=commentb value=PostComment onclick= " + "commentit("+  messageid + ")>" +"<br>"
+"</div>"
+"</fieldset>"
);

//document.getElementById("c"+message).addEventListener("click",commentit(messageid));
collapseIt(message);
messageid++;

//collapseIt(messageid);

});

socket.on('updateComments',(data) =>
{
$("#"+"p"+data.messageID).append("<p> "+ data.user + " " + data.text +  " <p>");
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
function commentit(id){
let text = $("#"+"t"+id).val();
let user =  $('#tempUser').val();
let pw = $('#password').val();
if(text != ""){
  $.ajax({
            url: "/check",
            type: "GET",
            data: {username:user,password:pw},
            success: function(data){
                if (data.error){
                  alert(data.message);
                }
                else {
                  socket.emit('updateComments', {'text': text,'messageID':id,'user': user});
                }
              } ,
            dataType: "json"
          });
  }
  else
    alert("you need a message");
}


function collapseIt(data){
//let message =  data.toString();

  document.getElementById(data).addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });

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
