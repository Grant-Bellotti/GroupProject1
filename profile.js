function createClicked(){
  $.ajax({
    url: "/create",
    type: "POST",
    data: {identifier:$("#identifier").val(),
            name:$("#name").val(),
            type:$("input:radio[name='type']:checked").val(),
            rating:$("#range").val(),
            image:$("#fileStuff").val()
          },
    success: function(data){
        if (data.error)
          alert("bad");
        else {
          alert("good");
          image1.src = data.image
        }
      } ,
    dataType: "json"
  });
  return false;
}
function readClicked(){
  $.ajax({
    url: "/read",
    type: "GET",
    data: {identifier:$("#identifier").val()},
    success: function(data){
        if (data.error)
          alert("bad");
        else {
          $("#name").val(data.name);
          $("#"+data.type).prop("checked",true);
          $("#range").val(data.rating);
          image1.src = data.image;
        }
      } ,
    dataType: "json"
  });
  return false;
}
function updateClicked(){
  $.ajax({
    url: "/update",
    type: "PUT",
    data: {identifier:$("#identifier").val(),
    name:$("#name").val(),
    type:$("input:radio[name='type']:checked").val(),
    rating:$("#range").val(),
    image:$("#fileStuff").val()
    },
    success: function(data){
        if (data.error)
          alert("bad");
        else {
          alert("good");
          image1.src = data.image
        }
      } ,
    dataType: "json"
  });
  return false;
}
function deleteClicked(){
  let trimIdentifier = $("#identifier").val().trim();

  if (trimIdentifier == "") {
    alert("bad");
    return false;
  }

  $.ajax({
    url: "/delete/" + $("#identifier").val(),
    type: "DELETE",
    success: function(data) {
      if (data.error)
        alert("bad");
      else
        alert("good");
    } ,
    dataType: "json"
  });
  return false;
}

$(document).ready(function(){

  $("#createButton").click(createClicked);
  $("#readButton").click(readClicked);
  $("#updateButton").click(updateClicked);
  $("#deleteButton").click(deleteClicked);

});
