let ident;
let messageid;
    $.ajax({
                      url: "/getmessageid",
                      type: "GET",
                      data: {'id':0},
                      success: function(data){
                           
                            messageid = data;
                            
                        } ,
                      dataType: "json"
    });

let socket = io();
//Get message from server.
socket.on('welcome', function(data) {
 let storedMessages = "4455";
     $.ajax({
                      url: "/getstoredMessages",
                      type: "GET",
                      data: {'id':0},
                      success: function(rata){
                           
                            storedMessages = rata.test;
                        console.log(rata.test);   
                         $("#messages").append(storedMessages); 
                        } ,
                      dataType: "json"
                    });

});

//Get message from server.
socket.on('update', (data) => {
if(data.msg == "")
 return;
let message =  messageid.toString();
let User = data.user.toString();

$("#messages").append(

"<fieldset>"+
'<p>'+ "Rating: " + data.survey + " Username: " + User +" "+  data.msg + '</p>'+

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
                    $.ajax({
                      url: "/storeMessage",
                      type: "POST",
                      data: {message:data.msg,id:messageid,user:User},
                      success: function(data){
                     
                        } ,
                      dataType: "json"
                    });
collapseIt(message);

//collapseIt(messageid);
 $.ajax({
                      url: "/getmessageid",
                      type: "GET",
                      data: {'id':0},
                      success: function(data){
                           
                            messageid = data;
                            
                        } ,
                      dataType: "json"
    });

});

socket.on('updateComments',(data) =>
{
$("#"+"p"+data.messageID).append("<p> "+ data.user + " " + data.text +  " <p>");
});

function doit() {
//Send message to server.
      let profdata;
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
                   $.ajax({
                      url: "/getSurvey",
                      type: "GET",
                      data: {username:user,password:pw},
                      success: function(data){
                          if (data.error)
                            alert(data.message);
                          else 
                            profdata = data.value;
                        } ,
                      dataType: "json"
                    });
                	socket.emit('update', {'msg': msg,'user':user,'survey':profdata});
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
