$(document).ready(function () {
    $("#screener-div").hide();
    $("#survey-div").hide();
    $("#screener-bye").hide();
    $("#survey-bye").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
    $('#time-success').hide();
    $("#loginErr").hide();
    
var user;  

    function checkPasswordChg() {
        var password = $("#inputPassword").val();
        var email = $("#inputEmail").val();
       $.ajax({
            type: "GET", 
             url: "http://localhost:8080/api/users/checkChange",
             headers: {
                "email": email,
                "password": password
            },
            success: function (response) {
                console.log('checkpasswordchange' + response);
            },
             error: function (err) {
                console.log(err);

            }
        })
    };
    
    
    $("#submitLoginButton").click(function (e) {
        e.preventDefault();
        checkPasswordChg();
        var password = $("#inputPassword").val();
        var email = $("#inputEmail").val();

        $.ajax({
            type: "post",
            url: "http://localhost:8080/api/users/login",
            headers: {
                "email": email,
                "password": password
            },
            success: function (response) {
                console.log(response);
                user = response;
                
                if (response.role.roleId === 2) {
                     $("#screener-div").show();
                     $("#login").hide();
                   // window.location.replace('/healthSurvey.html');
                } else if (response.role.roleId === 1) {
                    $("#screener-div").show();
                     $("#login").hide();
                    //window.location.replace('/dashboard.html');
                }
                return false;
            },
            error: function (err) {
                console.log(err);
                $('#loginErr').show();
                $('#loginErr').text("Either your username or password are incorrect. Please contact your branch administrator if you need assitance.");
                clearLogin();
                return false;
            }
        });
        return false;
    });

function clearLogin() {
    $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
    });
};

//================ SURVEY ==========================//
var user;

//if user is NOT coming in to the office: 
$("#q1No").on("click", function (e) {
    e.preventDefault();
    $("#screener-div").hide();
    $("#survey-bye").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
   
    console.log(user);
    var email = user.email;
    var password = user.defaultPW;
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users/coming",
        data: JSON.stringify({
            "user": user
            },
            {
                "isAttending": false
            }),
        contentType: "application/json;charset=UTF-8",
        headers: {
            "email": email,
            "password": password
        },
        success: function (response, status) {
            //alert('success');
            console.log(response);
            $("#screener-bye").show();

        },
        error: function (err) {
            alert('error');
            console.log(err);
        }
    });
});


//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function () {
    $("#screener-div").hide();
    $("#survey-div").show();
    $("#survey-bye").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
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
    });

    $('#q2').change(function () {
        answerTwo = $(this).prop('checked');
        console.log("Q2: " + answerTwo);
    });
    $('#q3').change(function () {
        answerThree = $(this).prop('checked');
        console.log("Q3: " + answerThree);
    });
}

function checkAuth() {
    if (answerOne === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        console.log(isAuthorized);
    } else if (answerTwo === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        console.log(isAuthorized);
    } else if (answerThree === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        console.log(isAuthorized);
    } else {
        $("#survey-bye").hide();
        $("#arrival-container").show();
        $("#departure-container").hide();
        console.log(isAuthorized);
        isAuthorized = true;
    }
};


$("#surveySubmit").on("click", function (e) {
    e.preventDefault();
    $("#survey-container").hide();
    checkAuth();
    if (isAuthorized === true) {
        console.log(isAuthorized);
        loadArrivals();
    } else if (isAuthorized === false) {
        notAuthorized();
    }
});

function notAuthorized() {
        console.log(user);
        var email = user.email;
        var password = user.defaultPW;
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "user": user
            },
                    {
                        "isAttending": true
                    },
                    {
                        "isAuthorized": false
                    }),

        headers: {
            "email": email,
            "password": password
        },
        success: function (response, status) {
            alert('success!');
            console.log(response);
        },
        error: function (err) {
            alert('error');
            console.log(err);

        }
    });
}
var startTime;

function loadArrivals() {
    console.log(user);
    var email = user.email;
    var password = user.defaultPW;
    var locationId = user.location.locationId;
    var userId = user.userId;
    authorized();
   
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users/times/" + locationId,

        headers: {
            "email": email,
            "password": password
        },
        success: function (response) {
            //console.log(response);
            
            $("#arrival-btn-div").empty();
            var arrivalDiv = $("#arrival-btn-div");
            var arrivalAccordianDiv = $("#arrival-accordion");
            var i;
            //var j;
            var hours = ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
            //console.log(hours.length);
//            $.each(hours, function(j) {
//                var hourCard = "<div class='.card time-card'>";
//                hourCard += "<div class='card-header'id='heading'" +i+">";
//                hourCard += "<h5 class='mb-0'>";
//                hourCard += "<button class='btn' data-toggle='collapse' data-target='#collapse'"+i+"aria-expanded='true' aria-controls='collapse'"+i+"></button>";
//                j++;
//             });  
            $.each(response, function (i, time) {
                if (response[i].isTaken === false) {
                    //for each hours[i] with timeslots avaialble print an accordian tab and print time in heading. 
                    //print the start time buttons in each  hours[i] accordian
                    var startTime = response[i].startTime;
                    startTime = startTime.substring(0, 5).trim();
                    var hour = startTime.substring(0, 2).trim();
                    //console.log(startTime + " / " + hour);
                    //console.log(hours[4]);
                    //for (i = 0; i < hour.length; i++)
                     
                    //if (hour.localeCompare(hours[3])) {
                    //    console.log(startTime); 
                    
                    //} else {
                    var timeSlotId = response[i].timeSlotId;
//                    var arrivalBtn = "<div>";
                    var arrivalBtn = "<div class='col-3'>";
                    arrivalBtn = "<button class='btn-primary btn-lg time' id='" + timeSlotId + "'>";
                    arrivalBtn += "<p class='item' id=p' "+timeSlotId+"'>" + startTime + "</p>";
                    arrivalBtn += "</button>";
                    arrivalBtn += "</div>";
                    arrivalDiv.append(arrivalBtn);
//                    var timeSlotId = response[i].timeSlotId;
//                    //console.log(timeSlotId + " - " + startTime);
//                    var arrivalBtn = "<div>";
////                  var arrivalBtn = "<div class='col-3'>";
//                    var arrivalBtn = "<button class='btn-primary btn-lg btn-block time' id='" + timeSlotId + "'>";
//                    arrivalBtn += "<p class='item' id=p' "+timeSlotId+"'>" + startTime + "</p>";
//                    arrivalBtn += "</button>";
//                    arrivalBtn += "</div>";
//                    arrivalDiv.append(arrivalBtn);
                }
               // };
               
            });

                $(".time").on('click', function (e) {
                    var timeSlotId = parseInt(this.id);
                    var time = $(this).find('.item').html(); 
                    console.log("Your time: " + timeSlotId + " / " +time);
                    $("#timeSelectedTime").val(time);
                    $("#timeSelected").val(timeSlotId);
                });

            $("#arrivalSubmit").on("click", function (e) {
                e.preventDefault();
                $("#arrival-container").hide();

                var timeSlotId = $("#timeSelected").val();
                //console.log(timeSlotId);

                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/users/arrival/" + timeSlotId,
                    data: JSON.stringify({"userId": userId}),
                    contentType: "application/json;charset=UTF-8",

                    headers: {
                        "email": email,
                        "password": password
                    },

                    success: function (response, status) {
                        console.log(response);
                        //alert(response.timeSlot.startTime);
                        $('#arrival-success').show();
                        $('#arrival-success').text("Your arrival time today is: " + response.timeSlot.startTime);
                        loadDepartures();
                        
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


function loadDepartures() {
   
    $("#arrival-container").hide();
    $("#departure-container").show();
    $("#arrival-success").show();
    console.log(user);
    var email = user.email;
    var password = user.defaultPW;
    var locationId = user.location.locationId;
    var userId = user.userId;
    
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users/times/" + locationId,
        headers: {
            "email": email,
            "password": password
        },
        success: function (response) {
            //console.log(response);
            $("#departure-btn-div").empty();
            var departureDiv = $("#departure-btn-div");
            var i;
            $.each(response, function (i, time) {
                if (response[i].isTaken === false) {
                    var startTime = response[i].startTime;
                    startTime = startTime.substring(0, 5).trim();
                    var timeSlotId = response[i].timeSlotId;
                    //console.log(timeSlotId + " / " + startTime);
                
//                    var departureBtn = "<div>";
                    var departureBtn = "<div class='col-3'>";
//                    departureBtn += "<button class='btn-primary time' id='" + timeSlotId + "'>";
                    departureBtn += "<button class='btn-primary btn-lg time' id='" + timeSlotId + "'>";
                    departureBtn += "<p class='item'>" + startTime + "</p>";
                    departureBtn += "</button>";
                    departureBtn += "</div>";
                    departureDiv.append(departureBtn);
                };  
 
                });
                
                $(".time").on('click', function (e) {
                    var timeSlotId = parseInt(this.id);
                    var time = $(this).find('.item').html(); 
                        console.log("Your time: " + timeSlotId + " / " +time);
                    $("#departureTimeSelectedTime").val(time);
                    $("#departureTimeSelected").val(timeSlotId);
                });
                
            $("#departureSubmit").on("click", function (e) {
                e.preventDefault();
                //$("#arrival-container").hide();
                $("#departure-container").hide();
                var timeSlotId = $("#departureTimeSelected").val();
                console.log(timeSlotId);

                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/users/departure/" + timeSlotId,
                    data: JSON.stringify({"userId": userId}),
                    contentType: "application/json;charset=UTF-8",

                    headers: {
                        "email": email,
                        "password": password
                    },

                    success: function (response, status) {
                        console.log(response);
                        //alert(response.timeSlot.startTime);
                        //$('#time-success').show();
                        $('#departure-success').show();
                        $('#departure-success').text("Your departure time today is: " + response.timeSlot.startTime);
                        
                    },
                    error: function (err) {
                        console.log(err);
                        return false;
                    }
                });
            });
        }
    });
    }
    
    //called after departure time POST to update attendance and authorization record to true: 
    function authorized() {
        //console.log(user);
        var email = user.email;
        var password = user.defaultPW;
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "user": user
                    },
                    {
                        "isAttending": true
                    },
                    {
                        "isAuthorized": true
                    }),

        headers: {
            "email": email,
            "password": password
        },
        success: function (response) {
            alert('success - attending:' + response.isAttending + 'authorized: ' +response.isAuthorized);
            console.log(response);
        },
        error: function (err) {
            alert('error' + err);
            console.log(err);

        }
    });
}

    function resetPassword(){
              //console.log(user);
        var email = user.email;
        var password = user.defaultPW;
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "user": user
                    },
                    {
                        "isAttending": true
                    },
                    {
                        "isAuthorized": true
                    }),

        headers: {
            "email": email,
            "password": password
        },
        success: function (response) {
            alert('success - attending:' + response.isAttending + 'authorized: ' +response.isAuthorized);
            console.log(response);
        },
        error: function (err) {
            alert('error' + err);
            console.log(err);

        }
    });  
    }
   
});