//
//this file is old and all JS for the user is now locate in the userLogin.js file ///

var email;
var password;
var userId;
var user;
var userLocation;
var locationName;
var locationId;
var cityName;
var allLocations;//for returned list of all location objects
var attendanceLocation; // for selected location choice
var newPassword;

$(document).ready(function () {
    $("#resetPassword").hide();
    $("#screener-div").hide();
    $("#survey-div").hide();
    $("#screener-bye").hide();
    $("#survey-not-authorized").hide();
    $("#survey-authorized").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
    $('#time-success').hide();
    $("#loginErr").hide();
});

    $("#submitLoginButton").click(function (e) {
        e.preventDefault();
        password = $("#inputPassword").val();
        email = $("#inputEmail").val();
    
    //1. get username and password and check to see if it's correct in DB
   // function checkPassword() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/api/users/login",
            headers: {
                "email": email,
                "password": password,
                "content-type": "application/json"
            },
            success: function (response) {
                user = response;
                userId = user.userId;
                console.log(userId);
                
                //2. 
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/users/checkChange/"+ userId,
                    data: JSON.stringify(user),

                    headers: {
                        "email": email,
                        "password": password,
                        "content-type": "application/json"
                    },
                    success: function (response) {
                        //console.log(response);
                        if (response === true) {
                            console.log('changed password is '+ response + ' success, password has been changed');
                        } else if (response === false) {
                            console.log('changed password is '+ response + ' please change password');
                            resetPassword();
                            $("#screener-div").hide();
                        }
                    },
                    error: function (err) {
                        //reject(err);
                        $("#resetPasswordErr").show();
                        console.log(err);
                    }
                });
                
                if (response.role.roleId === 2) {
                     $("#screener-div").show();
                     getAttendanceLocation();
                     $("#login").hide();
                     $("#resetPassword").hide();
                } else if (response.role.roleId === 1) {
                     $("#screener-div").show();
                      getAttendanceLocation();
                     $("#login").hide();
                     $("#resetPassword").hide();

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

    });
    
    // RESET PASSWORD FUNCTIONALITY 
    $("#reset-password-btn").click(function (e) {
        e.preventDefault();
        resetPassword();
        //function checkPasswordChg();
    });
    
    
    function resetPassword() {
        $("#login").hide();
        $("#screener-div").hide();
        $("#passwordSuccess").hide();
        $("#resetPasswordErr").hide();
        $("#resetPassword").show();

        //on submit, first check login for login success
        $("#submit-reset-btn").click(function (e) {
            e.preventDefault();
            
           // $("#submitLoginButton").click(function (e) {
              //  e.preventDefault();
                email = $("#resetEmail").val();
                password = $("#resetPasswordInput").val();
                
                password = $("#inputPassword").val();
                email = $("#inputEmail").val();
        
                if (email.length === 0) {
                    $('#resetPasswordErr').show();
                    $('#resetPasswordErr').text("Please enter your email address.");
                }
                if (password.length === 0) {
                   $('#resetPasswordErr').show();
                   $('#resetPasswordErr').text("Please enter your password. If you do not know your password, please contact your branch administrator for further assistance.");
                }

                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/api/users/login",
                    headers: {
                        "email": email,
                        "password": password
                    },
                    
                    success: function (response) {
                        user = response;
                        console.log(user);
                            var newPassword = $("#newPassword").val();
                            user.passwords = newPassword;
                            console.log(newPassword);
                
                            if (newPassword.length === 0) {
                            $('#resetPasswordErr').show();
                            $('#resetPasswordErr').text("Please enter a new password.");
                            }
 
                         //newPassword = password;
                     },
                        error: function (err) {
                                console.log(err);
                                $("#resetPasswordErr").show();
                                $('#loginErr').show();
                                $('#loginErr').text("Either your username or password are incorrect. Please contact your branch administrator if you need assitance.");
                            }
                        
                    });
 
                        //on login success, update password 
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:8080/api/users/editUser",
                            data: JSON.stringify(user),
                            headers: {
                                "email": email,
                                "password": password,
                                "content-type": "application/json"
                            },
                            success: function (response, status) {
                                console.log(response);
                                $("#passwordSuccess").show('success');
                                $("#resetPassword").hide();
                                $("#screener-div").show();
                            },   
                            error: function (err) {
                                console.log(err);
                                $("#resetPasswordErr").show();
                                $('#loginErr').show();
                                $('#loginErr').text("Either your username or password are incorrect. Please contact your branch administrator if you need assitance.");
                                }
                        });   

                                $.ajax({
                                type: 'GET',
                                url: 'http://localhost:8080/api/users/locations',
                                headers: {
                                    'email': email,
                                    'password': password
                                },
                                success: function (data) {
                                    console.log(data);
                                    allLocations = data;
                                    console.log(allLocations);

                                    $('#userLocationOption')
                                            .append($("<option></option>")
                                                    .attr("value", locationId)
                                                    .text(userLocation));
                                    $.each(data, function (index, datum) {
                                        //console.log(data);
                                        locationName = data[index].cityName;
                                        //console.log(locationName);
                                        if (datum.cityName !== userLocation) {
                                            $('#userLocationOption')
                                                    .append($("<option></option>")
                                                            .attr("value", index + 1)
                                                            .text(datum.cityName));
                                        }
                                    });
                                },
                                error: function (http) {
                                    console.log(http + 'An error resulted when attempting to retrieve locations.');
                                }
    
                        });
            });
        };
    
 

    function clearLogin() {
        $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
        });
    };


    function getAttendanceLocation(){

        locationId = user.location.locationId;
        userLocation = user.location.cityName;
        console.log(locationId);
        console.log(userLocation);
        console.log(password);
        console.log(email);
        
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/users/locations',
                headers: {
                    'email': email,
                    'password': password
                },
                success: function (data) {
                   console.log(data);
                   allLocations = data;
                   console.log(allLocations);
                   
                    $('#userLocationOption')
                            .append($("<option></option>")
                                .attr("value", locationId)
                                .text(userLocation));
                    $.each(data, function(index, datum) {
                        //console.log(data);
                        locationName = data[index].cityName;
                        //console.log(locationName);
                        if (datum.cityName !== userLocation) {
                           $('#userLocationOption')
                            .append($("<option></option>")
                                .attr("value", index + 1)
                                .text(datum.cityName));
                        }
                    });
                },
                error: function (http) {
                    console.log(http);
                    console.log('An error resulted when attempting to retrieve locations.');
                }
            });
        };
            
            
//================ SURVEY ==========================//

//if user is NOT coming in to the office: 
$("#q1No").on("click", function (e) {
    e.preventDefault();
    
    $("#screener-div").hide();
    $("#survey-not-authorized").hide();
    $("#survey-authorized").hide();
//    $("#arrival-container").hide();
//    $("#departure-container").hide();

    console.log(user);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users/coming",
        
        data: JSON.stringify({
            user: user,
            "isAttending": false
           
            //"isAuthorized": true
            }),
//        contentType: "application/json;charset=UTF-8",
        headers: {
            "email": email,
            "password": password,
            "content-type": "application/json"
        },
        success: function (response, status) {
            //alert('success');
            console.log(response);
            $("#screener-bye").show();

        },
        error: function (err) {
            //alert('error');
            console.log(err);
        }
    });
});


//if user is coming in to the office, show health survey questions:
$("#q1Yes").on("click", function () {
    //getAttendanceLocation();

    $("#screener-div").hide();
    $("#survey-div").show();
    $("#survey-not-authorized").hide();
    $("#survey-authorized").hide();
//    $("#arrival-container").hide();
//    $("#departure-container").hide();
    toggle();
});

var isAuthorized = true;
var answerOne = false;
var answerTwo = false;
var answerThree = false;

function toggle() {
    $('#q1').change(function () {
        answerOne = $(this).prop('checked');
        //console.log("Q1: " + answerOne);
    });

    $('#q2').change(function () {
        answerTwo = $(this).prop('checked');
        //console.log("Q2: " + answerTwo);
    });
    $('#q3').change(function () {
        answerThree = $(this).prop('checked');
        //console.log("Q3: " + answerThree);
    });
}

function checkAuth() {
    if (answerOne === true) {
        isAuthorized = false;
        //$("#survey-not-authorized").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        //console.log(isAuthorized);
    } else if (answerTwo === true) {
        isAuthorized = false;
        //$("#survey-not-authorized").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        //console.log(isAuthorized);
    } else if (answerThree === true) {
        isAuthorized = false;
        //$("#survey-not-authorized").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        //console.log(isAuthorized);
    } else {
        $("#survey-not-authorized").hide();
        $("#arrival-container").show();
        $("#departure-container").hide();
        //console.log(isAuthorized);
        isAuthorized = true;
    }
};


$("#surveySubmit").on("click", function (e) {

    e.preventDefault();
    $("#survey-container").hide();
    checkAuth();
    if (isAuthorized === true) {
        console.log(isAuthorized);
        authorized();
        //loadArrivals();
    } else if (isAuthorized === false) {
        notAuthorized();
    }
});

function notAuthorized() {
        console.log(user);
        attendanceLocation = $('#userLocationOption').val();
        var locationObj = allLocations[(attendanceLocation - 1)];
        console.log(locationObj);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
//            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "isAttending": true,
                "isAuthorized": false,
                user: user,
                location : locationObj,
            }),

        headers: {
            "email": email,
            "password": password,
            "content-type": "application/json"
        },
        success: function (response, status) {
            $("#survey-not-authorized").show();
            console.log(response);
        },
        error: function (err) {
            console.log(err);

        }
    });
}

    //called after departure time POST to update attendance and authorization record to true: 
    function authorized() {
        console.log(user);
        attendanceLocation = $('#userLocationOption').val();
        console.log(attendanceLocation);
        
        console.log(allLocations[attendanceLocation - 1]);
        var locationObj = allLocations[(attendanceLocation - 1)];
        console.log(locationObj);
        //email = user.email;
        //password = user.passwords;
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",

            data: JSON.stringify({
                     "isAttending": true,
                     "isAuthorized": true,
                     location : locationObj,
                     user: user
                }),
        headers: {
            "email": email,
            "password": password,
            "content-type": "application/json"
        },
        success: function (response) {
            //alert('success - attending:' + response.isAttending + 'authorized: ' +response.isAuthorized);
             $("#survey-authorized").show();
             $("#survey-authorized-text").html('You are authorized to come in to the ' + response.location.cityName + ' office today.');
            //console.log(response);
        },
        error: function (err) {
            //alert('error' + err);
            console.log(err);
        }
    });
}
 





function showGuidelines() {
    var x = document.getElementById("guidelinesDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};



//var startTime;

//function loadArrivals() {
//    console.log(user);
//    email = user.email;
//    password = user.passwords;
//    console.log(password);
//    locationId = user.location.locationId;
//    //var userId = user.userId;
//    authorized();
//   
//    $.ajax({
//        type: "GET",
//        url: "http://localhost:8080/api/users/times/" + locationId,
//
//        headers: {
//            "email": email,
//            "password": password
//        },
//        success: function (response) {
//            //console.log(response);
//            $("#arrival-btn-div").empty();
//            var arrivalDiv = $("#arrival-btn-div");
//            var i;
// 
//            $.each(response, function (i, time) {
//                if (response[i].isTaken === false) {
//                    var startTime = response[i].startTime;
//                    startTime = startTime.substring(0, 5).trim();
//                    var hour = startTime.substring(0, 2).trim();
//
//                    var timeSlotId = response[i].timeSlotId;
////                   
//                    var arrivalBtn = "<div class='col-3'>";
//                    arrivalBtn = "<button class='btn-primary btn-lg time' id='" + timeSlotId + "'>";
//                    arrivalBtn += "<p class='item' id=p' "+timeSlotId+"'>" + startTime + "</p>";
//                    arrivalBtn += "</button>";
//                    arrivalBtn += "</div>";
//                    arrivalDiv.append(arrivalBtn);
//                }
//            });
//
//                $(".time").on('click', function (e) {
//                    var timeSlotId = parseInt(this.id);
//                    var time = $(this).find('.item').html(); 
//                    console.log("Your time: " + timeSlotId + " / " +time);
//                    $("#timeSelectedTime").val(time);
//                    $("#timeSelected").val(timeSlotId);
//                });
//
//            $("#arrivalSubmit").on("click", function (e) {
//                e.preventDefault();
//                $("#arrival-container").hide();
//                
//                var timeSlotId = $("#timeSelected").val();
//                console.log(timeSlotId);
//                console.log(user);
//                $.ajax({
//                    type: "POST",
//                    url: "http://localhost:8080/api/users/arrival/" + timeSlotId,
//                    contentType: "application/json;charset=UTF-8",
//                    data: JSON.stringify(
//                        user                       
//                    ),
//                    headers: {
//                        "email": email,
//                        "password": password
//                    },
//
//                    success: function (response) {
//                        console.log(response);
//                        //alert(response.timeSlot.startTime);
//                        $('#arrival-success').show();
//                        $('#arrival-success').text("Your arrival time today is: " + response.timeSlot.startTime);
//                        loadDepartures();
//                        
//                    },
//                    error: function (err) {
//                        console.log(err);
//                        //$("#screener-div").hide();
//                        //$("#survey-bye").show();
//                        return false;
//                    }
//                });
//            });
//        }
//    });
//}


//function loadDepartures() {
//    $("#arrival-container").hide();
//    $("#departure-container").show();
//    $("#arrival-success").show();
//    console.log(user);
//    email = user.email;
//    password = user.passwords;
//    locationId = user.location.locationId;
//    userId = user.userId;
//    
//    $.ajax({
//        type: "GET",
//        url: "http://localhost:8080/api/users/times/" + locationId,
//        headers: {
//            "email": email,
//            "password": password
//        },
//        success: function (response) {
//            //console.log(response);
//            $("#departure-btn-div").empty();
//            var departureDiv = $("#departure-btn-div");
//            var i;
//            $.each(response, function (i, time) {
//                if (response[i].isTaken === false) {
//                    var startTime = response[i].startTime;
//                    startTime = startTime.substring(0, 5).trim();
//                    var timeSlotId = response[i].timeSlotId;
//                    //console.log(timeSlotId + " / " + startTime);
//                
//                    var departureBtn = "<div class='col-3'>";
//                    departureBtn += "<button class='btn-primary btn-lg time' id='" + timeSlotId + "'>";
//                    departureBtn += "<p class='item'>" + startTime + "</p>";
//                    departureBtn += "</button>";
//                    departureBtn += "</div>";
//                    departureDiv.append(departureBtn);
//                };  
// 
//                });
//                
//                $(".time").on('click', function (e) {
//                    var timeSlotId = parseInt(this.id);
//                    var time = $(this).find('.item').html(); 
//                        console.log("Your time: " + timeSlotId + " / " +time);
//                    $("#departureTimeSelectedTime").val(time);
//                    $("#departureTimeSelected").val(timeSlotId);
//                });
//                
//            $("#departureSubmit").on("click", function (e) {
//                e.preventDefault();
//                //$("#arrival-container").hide();
//                $("#departure-container").hide();
//                var timeSlotId = $("#departureTimeSelected").val();
//                console.log(timeSlotId);
//
//                $.ajax({
//                    type: "POST",
//                    url: "http://localhost:8080/api/users/departure/" + timeSlotId,
//                    data: JSON.stringify({"userId": userId}),
//                    contentType: "application/json;charset=UTF-8",
//
//                    headers: {
//                        "email": email,
//                        "password": password
//                    },
//
//                    success: function (response, status) {
//                        console.log(response);
//                        //alert(response.timeSlot.startTime);
//                        //$('#time-success').show();
//                        $('#departure-success').show();
//                        $('#departure-success').text("Your departure time today is: " + response.timeSlot.startTime);
//                        $('#overall-success').show();
//                        $('#overall-success').text("Thanks, your response has been recorded.");
//                        
//                    },
//                    error: function (err) {
//                        console.log(err);
//                        return false;
//                    }
//                });
//            });
//        }
//    });
//    }
    
