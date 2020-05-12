$(document).ready(function () {
  $("#screener-div").show();
  $("#survey-div").hide();
  $("#screener-bye").hide();

});

//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function(){
  $("#screener-div").hide();
  $("#survey-div").show();
})

//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function(){
  $("#screener-div").hide();
  $("#survey-div").show();
})

//if user is NOT coming in to the office: 
$("#q1No").on("click", function(){
  $("#screener-div").hide();
  $("#screener-bye").show();
  //send response to database to note that user logged in but will not be coming to office today
})

// $("#submit-survey-btn").on("click", function (e) {
//   e.preventDefault();
//   var response = $(".survey").val();
//   //var input = $("#item-input");
//   console.log("survey response: " + response);


// })