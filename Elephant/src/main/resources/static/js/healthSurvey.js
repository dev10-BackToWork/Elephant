$(document).ready(function () {
  $("#screener-div").show();
  $("#survey-div").hide();
  $("#screener-bye").hide();
  $("#survey-bye").hide();
  $("#survey-authorized").hide();
});

//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function(){
  $("#screener-div").hide();
  $("#survey-div").show();
  $("#survey-bye").hide();
  $("#survey-authorized").hide();
  toggle();
});

//if user is NOT coming in to the office: 
$("#q1No").on("click", function(){
  $("#screener-div").hide();
  $("#screener-bye").show();
  $("#survey-bye").hide();
  $("#survey-authorized").hide();
  //send response to database to note that user logged in but will not be coming to office today
});

var isAuthorized = true;
var answerOne = false;
var answerTwo = false;
var answerThree = false;

function toggle() {
    $('#q1').change(function () {
        answerOne = $(this).prop('checked');
        console.log("Q1: " + answerOne);
       // $('#q1Equals').html(answerOne);
    });

    $('#q2').change(function () {
        answerTwo = $(this).prop('checked');
        console.log("Q2: " + answerTwo);
        //$('#q2Equals').html(answerTwo);
    });
    $('#q3').change(function () {
        answerThree = $(this).prop('checked');
        console.log("Q3: " + answerThree);
       // $('#q3Equals').html(answerThree);
    });
}
    
var password = "password";
var email = "user@user.com";

$("#surveySubmit").on("click", function (e) {
    e.preventDefault();
    $("#survey-container").hide();
   

        if  (answerOne === true){
             isAuthorized = false;
              $("#survey-bye").show();
              $("#survey-authorized").hide();
              console.log(isAuthorized);
         } else if (answerTwo === true){
             isAuthorized = false;
              $("#survey-bye").show();
              $("#survey-authorized").hide();
             console.log(isAuthorized);
         } else if (answerThree === true) {
             isAuthorized = false;
              $("#survey-bye").show();
              $("#survey-authorized").hide();
             console.log(isAuthorized);
         } else {
             $("#survey-bye").hide();
             $("#survey-authorized").show();
             console.log(isAuthorized);
             isAuthorized = true;
         }
         
        $.ajax({
            type: "POST",
            data: "",
            url: "http://localhost:8080/api/users/coming/1",
            contentType: "application/json;charset=UTF-8",
           //$("authorized").text("You're approved to come to the office. Next, select a time.");
            headers: {
                "email": email,
                "password": password
            },
    
            success: function (response) {
                
                console.log(response);
                return false;
            },
            error: function (err) {
                console.log(err);
                 $("#screener-div").hide();
                 $("#survey-bye").show();
                return false;
            }
        });

        return false;
    });




$("#surveySubmit").on("click", function (e) {
    e.preventDefault();
    $("#survey-container").hide();
   

         
        $.ajax({
            type: "POST",
            data: "",
            url: "http://localhost:8080/api/users/coming/1",
            contentType: "application/json;charset=UTF-8",
           //$("authorized").text("You're approved to come to the office. Next, select a time.");
            headers: {
                "email": email,
                "password": password
            },
    
            success: function (response) {
                
                console.log(response);
                return false;
            },
            error: function (err) {
                console.log(err);
                 $("#screener-div").hide();
                 $("#survey-bye").show();
                return false;
            }
        });

        return false;
    });
