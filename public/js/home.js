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

if(data.type == "Text") {
  $("#messages").append(
    '<div class="postBlock">' +
    '<p class="postli" style="background-color:'+ data.color +';">' + data.msg + " " + data.user + '<br>'+'<body>'+data.msg+'</body>'+'</p>'+
    '<div>'+
    "<button type=button class='collapsible' " + 'style="background-color:'+ data.color + ';">' + 'Comments</button>'+

    "<div class="+ "content"+"> " +"<hr>"
    +"<p>Lorem ipsum...</p>" +"<hr>"
    +"</div>"
    +"</div>"
    + "</div>"
  );
}
else if(data.type == "Image") {
  $("#messages").append(
    "<div class='postBlock'>" +
    "<p class='imageUser'>" + data.user + "</p>" +
    "<img id='display' class='postli' style='background-color:'"+ data.color +";' src='" + "images/" + data.msg + "' height='150' width='150'>" +
    "<div>" +
    "<button type=button class='collapsible' " + 'style="background-color:'+ data.color + ';">' + 'Comments</button>'+

    "<div class="+ "content"+"> " +"<hr>"
    +"<p>Lorem ipsum...</p>" +"<hr>"
    +"</div>"
    +"</div>"
    + "</div>"
  );
}

collapseIt();

});
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*
function doit() {
//Send message to server.
      msg = $('#postT').val();
      user = $('#tempUser').val();
      pw = $('#password').val();
      color = getRandomColor()
          $.ajax({
            url: "/check",
            type: "GET",
            data: {username:user,password:pw},
            success: function(data){
                if (data.error){
                  alert(data.message);
                }
                else {
                	socket.emit('update', {'msg': msg,'user':user,'color':color});
                }
              } ,
            dataType: "json"
          });

      return false;
}
*/
function uploadSuccess(data) {
  let type = $("input:radio[name='type']:checked").val();
  let user = $('#tempUser').val();
  let pw = $('#password').val();
  let msg = "";
  let color = getRandomColor()
  if (data.error)
  {
    alert(data.message);
    return;
  }

  $.ajax({
    url: "/check",
    type: "GET",
    data: {username:user,password:pw},
    success: function(data2){
      if (data2.error){
        alert(data2.message);
      }
      else {
        if (type == "Text") {
          msg = $('#postT').val();
        }
        else if (type == "Image") {
          msg = data.filename2;
        }

        socket.emit('update', {'type':type, 'msg': msg,'user':user,'color':color});
      }
    } ,
    dataType: "json"
  });
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
  $("form").submit(function(event) {
    let data = new FormData($(this)[0]);
    $.ajax({
      url: '/fileupload',
      type: 'POST',
      data: data,
      processData: false, // These two are needed to prevent JQuery from processing the form data
      contentType: false,
      mimeType: 'multipart/form-data',
      dataType: 'json', // Without this, the server's response will be a string instead of a JSON object
      success: uploadSuccess
    });
    return false;
  });

});
