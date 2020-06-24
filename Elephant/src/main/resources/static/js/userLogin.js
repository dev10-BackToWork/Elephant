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
    $('#loadingMsg').hide();
});

$("#submitLoginButton").click(function (e) {
    e.preventDefault();
    checkPassword();
    //password = $("#inputPassword").val();
    //email = $("#inputEmail").val();
});


//1. get username and password and check to see if it's correct in DB
function checkPassword() {
    password = $("#inputPassword").val();
    email = $("#inputEmail").val();

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
            firstName = user.firstName;
            checkChange();
        },
        error: function (err) {
            console.log(err);
            $('#loginErr').show();
            $('#loginErr').text("Either your username or password are incorrect. Please contact your branch administrator if you need assitance.");
            clearLogin();
            return false;
        }
    });
};


//2. If password was success above, check to see if password has been changed
function checkChange() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users/checkChange/" + userId,
        data: JSON.stringify(user),

        headers: {
            "email": email,
            "password": password,
            "content-type": "application/json"
        },
        success: function (response) {

            if (response === true) {
                console.log('changed password is ' + response + ' success, password has been changed');
                password = $("#inputPassword").val();
                getAttendanceLocation();
                //$("#screener-div").show();
                $("#login").hide();
                $("#resetPassword").hide();

            } else if (response === false) {
                console.log('changed password is ' + response + ' please change password');
                resetPassword();
                $("#screener-div").hide();
                $("#resetHeading").html("Welcome, " + firstName + "! </br> Since it's your first time logging in, please change your password.");
                $("#resetEmailInput").val(email);
                $("#resetPasswordInput").val(password);
                $("#resetPasswordErr").hide();
            }
        },
        error: function (err) {
           
            $("#resetPasswordErr").show();
            console.log(err);
        }

    });

};

// CHANGE PASSWORD FUNCTIONALITY 
$("#reset-password-btn").click(function (e) {
    e.preventDefault();
    resetPassword();
    $("#resetPasswordErr").empty();
    $("#resetPasswordErr").hide();
    //function checkPasswordChg();
});

// SUBMIT NEW PASSWORD
$("#submit-reset-btn").click(function (e) {
    e.preventDefault();
    validateNewPassword();
});

function resetPassword() {
    $("#login").hide();
    $("#screener-div").hide();
    $("#passwordSuccess").hide();
    $("#resetPassword").show();
    $("#newPassword").val('');
    $("#newPasswordConfirm").val('');
};

$("#newPassword").click(function (e) {
    $("#resetPasswordErr").empty();
    $("#resetPasswordErr").hide();
  });


function validateNewPassword() {
//    email = $("#resetEmailInput").val();
//    password = $("#resetPasswordInput").val();
    var newPassword = $("#newPassword").val();
    var newPasswordConfirm = $("#newPasswordConfirm").val();
    if(newPassword.length >= 8 && newPasswordConfirm.length >= 8){
    console.log('long enough');
    
    var compareNewPasswordInput = newPassword.localeCompare(newPasswordConfirm);

    console.log(compareNewPasswordInput);
    if (compareNewPasswordInput === 0) {
        console.log('password input matches - ' + compareNewPasswordInput);
        // then check if new password string is equal to old password 
        var validChangedPassword = password.localeCompare(newPasswordConfirm);
        if (validChangedPassword === 0) {
            $("#resetPasswordErr").show();
            $("#resetPasswordErr").text('You must choose a password that is different from your old password. Please re-enter a new password.');
            resetPassword();
        } else {
            console.log('This is a new password!');
            user.passwords = $("#newPasswordConfirm").val();
            console.log(user.passwords);
            saveNewPassword();
        }

    } else {
        $("#resetPasswordErr").show();
        $("#resetPasswordErr").text('The confirmation password does not match your new password. Please re-enter a new password.');
        console.log('The confirmation password does not match your new password. Please re-enter a new password.');
        resetPassword();
    }
    } else {
       $("#resetPasswordErr").show();
       $("#resetPasswordErr").text('Your password must contain at least 8 characters. Please re-enter a new password.');
       console.log('Your password must contain at least 8 characters. Please re-enter a new password.');
       resetPassword(); 
    }
};

function saveNewPassword() {
    //on login success, update password 
    console.log(password);
    console.log(user);
    //user.passwords = password;
    console.log(user.passwords);
     
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users/editUser",
        data: JSON.stringify(user),
        headers: {
            "email": email,
            "password": password,
            "content-type": "application/json"
        },
        success: function (response) {
            loadingMsg();
            password = user.passwords;
            getAttendanceLocation();
            console.log(response);
            $("#passwordSuccess").show('success');
            $("#resetPassword").hide();

        },
        error: function (err) {
            console.log(err);
            $("#resetPasswordErr").show();
            $('#loginErr').show();
            $('#loginErr').text("Either your username or password are incorrect. Please contact your branch administrator if you need assitance.");
        }
    });
};

function loadingMsg() {
       $('#loadingMsg').show();
       //$('.form-control').val('');
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
                   $("#screener-div").show();
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
                location : locationObj
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
        var cityName = locationObj.cityName;
        console.log(cityName);
        
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
             $("#survey-authorized-text").html('You are authorized to come in to the ' + cityName + ' office today.');
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

