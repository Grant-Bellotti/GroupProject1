function submitClicked(){
  let surveyNum = (parseInt($("input:radio[name='q1']:checked").val()) + parseInt($("input:radio[name='q2']:checked").val()) +
                  parseInt($("input:radio[name='q3']:checked").val()) + parseInt($("input:radio[name='q4']:checked").val()) +
                  parseInt($("input:radio[name='q5']:checked").val()) + parseInt($("input:radio[name='q6']:checked").val()) +
                  parseInt($("input:radio[name='q7']:checked").val()) + parseInt($("input:radio[name='q8']:checked").val()) +
                  parseInt($("input:radio[name='q9']:checked").val()) + parseInt($("input:radio[name='q10']:checked").val()));
  $.ajax({
    url: "/surveySubmit",
    type: "POST",
    data: {surveyNumber:surveyNum,
           password:"abc",
           username:"abc"},
    success: function(data){
      if(data.error)
        alert("error");
      else {
        console.log(data.num);
        alert("your survey number is "+data.num);
      }
    },
    dataType: "json"
  });
  return false;
}

$(document).ready(function(){
  $("#submitButton").click(submitClicked);

});
