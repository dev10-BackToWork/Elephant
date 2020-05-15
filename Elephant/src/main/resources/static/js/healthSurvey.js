$(document).ready(function () {
    $("#screener-div").show();
    $("#survey-div").hide();
    $("#screener-bye").hide();
    $("#survey-bye").hide();
    $("#survey-authorized").hide();
    $('#time-success').hide();
});

//need to change var values to login object once on the same page
var password = "password";
var email = "user@user.com";
var locationId = 1;
var userId = 1;

//if user is NOT coming in to the office: 
//send response to database to note that user logged in but will not be coming to office today display message that their response was recorded as a callback 
$("#q1No").on("click", function (e) {
    e.preventDefault();
    $("#screener-div").hide();
    $("#survey-bye").hide();
    $("#survey-authorized").hide();
    // $("#survey-container").hide();
    
    $.ajax({
        type: "POST",
        data: {
            "isAttending" : false,
            "userId": userId
        },
        
        url: "http://localhost:8080/api/users/coming/" + userId,
        contentType: "application/json;charset=UTF-8",
        //$("authorized").text("You're approved to come to the office. Next, select a time.");
        headers: {
            "email": email,
            "password": password
        },
        success: function (response, status) {
            console.log(response);
            $("#screener-bye").show();
           
        },
        error: function (err) {
            console.log(err);
            //$("#screener-div").hide();
            //$("#survey-bye").show();
          
        }
    });
});


//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function () {
    $("#screener-div").hide();
    $("#survey-div").show();
    $("#survey-bye").hide();
    $("#survey-authorized").hide();
    toggle();
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

function checkAuth() {
    if (answerOne === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        $("#survey-authorized").hide();
        console.log(isAuthorized);
    } else if (answerTwo === true) {
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
};


$("#surveySubmit").on("click", function (e) {
    e.preventDefault();
    $("#survey-container").hide();
    checkAuth();
    console.log(isAuthorized);
    loadItems();
});
//        if  (answerOne === true){
//             isAuthorized = false;
//              $("#survey-bye").show();
//              $("#survey-authorized").hide();
//              console.log(isAuthorized);
//         } else if (answerTwo === true){
//             isAuthorized = false;
//              $("#survey-bye").show();
//              $("#survey-authorized").hide();
//             console.log(isAuthorized);
//         } else if (answerThree === true) {
//             isAuthorized = false;
//              $("#survey-bye").show();
//              $("#survey-authorized").hide();
//             console.log(isAuthorized);
//         } else {
//             $("#survey-bye").hide();
//             $("#survey-authorized").show();
//             console.log(isAuthorized);
//             isAuthorized = true;
//         }

function loadItems() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users/times/" + locationId,
        //contentType: "application/json;charset=UTF-8",
        //$("authorized").text("You're approved to come to the office. Next, select a time.");
        headers: {
            "email": email,
            "password": password
        },
        success: function (response) {
            console.log(response);
            $("#arrival-btn-div").empty();
            var arrivalDiv = $("#arrival-btn-div");
            var i;
            $.each(response, function (i, time) {
                if (response[i].isTaken === false) {
                    var startTime = response[i].startTime;
                    var timeSlotId = response[i].timeSlotId;
                    console.log(timeSlotId + "--" + startTime);

                    var arrivalBtn = "<div class='col-3'>";
                    arrivalBtn += "<button class='btn-primary btn-lg btn-block time' id='" + timeSlotId + "'>";
                    arrivalBtn += "<p class='item'>"+ startTime +"</p>";
                    arrivalBtn += "</button>";
                    arrivalBtn += "</div>";
                    arrivalDiv.append(arrivalBtn);
                };
                
            });

            $(function () {
                $(".time").click(function () {
                    console.log(this.id);
                    var timeSlotId = parseInt(this.id);
                   // var itemId = parseInt(input);
                    console.log("Your time: " + timeSlotId);
                    $("#timeSelected").val(timeSlotId);
                });
            });
            
 
        $("#arrivalSubmit").on("click", function (e) {
            
            e.preventDefault();
            $('#survey-authorized').hide();
              var timeSlotId = $("#timeSelected").val(timeSlotId);
              
        $.ajax({
            type: "POST",
             url: "http://localhost:8080/api/users/arrival/" + timeSlotId,
            data: {
               "userId" : 1
            },
            contentType: "application/json;charset=UTF-8",
          
            headers: {
                "email": email,
                "password": password
            },
    
            success: function (response, status) {
                console.log(response);
                alert("success!");
                $('#time-success').show(); 
                //return false;
            },
            error: function (err) {
                console.log(err);
                 //$("#screener-div").hide();
                 //$("#survey-bye").show();
                return false;
                    }
                });
            });


        }
    });
}
