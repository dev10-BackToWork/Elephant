$(document).ready(function () {
  $("#screener-div").show();
  $("#survey-div").hide();
  $("#screener-bye").hide();
  $("#survey-bye").hide();
});

//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function(){
  $("#screener-div").hide();
  $("#survey-div").show();
  $("#survey-bye").hide();
});

//if user is NOT coming in to the office: 
$("#q1No").on("click", function(){
  $("#screener-div").hide();
  $("#screener-bye").show();
  $("#survey-bye").hide();
  //send response to database to note that user logged in but will not be coming to office today
});

var answerOne = false;
var answerTwo = false;
var answerThree = false;

    function toggle (){
            //$(function () {
        $('#q1').change(function () {
          answerOne = $(this).prop('checked');
           console.log(answerOne);
            $('#q1Equals').html(answerOne);
         });
         
        $('#q2').change(function () {
          answerTwo = $(this).prop('checked');
           console.log(answerTwo);
            $('#q2Equals').html(answerTwo);
        });
        $('#q3').change(function () {
          answerThree = $(this).prop('checked');
           console.log(answerThree);
            $('#q3Equals').html(answerThree);
        });
     }

        
      function checkResponse() {
         if ((answerOne == true) || (answerTwo == true) || (answerThree == true)) {
              console.log("you're sick");
          } else if ((answerOne == false) || (answerTwo == false) || (answerThree == false)) {
              console.log("approved");
          }
      }
              // $('#questionDiv').show();
              // console.log("YES!");
           //} else {
              // console.log("Q2 = FALSE");
              // $('#questionDiv').hide();
          // }
        
            //$('#q2Equals').html('Toggle: ' + $(this).prop('checked'));
//            $('#q2Equals').html(answerTwo);
            
          
//    $("#q2").trigger("change");

   

    
//$("#submit-survey-btn").on("click", function (e) {
$("#surveySubmit").on("click", function (e) {
   
    e.preventDefault();
    checkResponse();
});
    // var q1 = $(".survey").val();
//    var q2
//    var q3
//   //var input = $("#item-input");
//   console.log("survey response: " + response);




//    $("#submitLoginButton").click(function (e) {
//        e.preventDefault();
//        var password = $("#inputPassword").val();
//        var email = $("#inputEmail").val();
//
//        $.ajax({
//            type: "post",
//            //url: "http://localhost:8080/api/users/login",
//            headers: {
//                "email": email,
//                "password": password
//            },
//            success: function (response) {
//                console.log(response);
//                return false;
//            },
//            error: function (err) {
//                console.log(err);
//                return false;
//            }
//        });
//
//        return false;
//    });



