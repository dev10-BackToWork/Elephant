$(document).ready(function () {
    $("#resetPassword").hide();
    $("#screener-div").hide();
    $("#survey-div").hide();
    $("#screener-bye").hide();
    $("#survey-bye").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
    $('#time-success').hide();
    $("#loginErr").hide();
     
var email;
var password;
var userId;
var user;  
    
    $("#submitLoginButton").click(function (e) {
        e.preventDefault();
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
                console.log(userId);
                
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/users/checkChange/"+ userId,
                    //url: "http://localhost:8080/api/users/checkChange",
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
                        //$("#resetPassword").show();
                        $("#resetPasswordErr").show();
                        console.log(err);
                    }
                });
                
                if (response.role.roleId === 2) {
                     $("#screener-div").show();
                     $("#login").hide();
                     $("#resetPassword").hide();
                } else if (response.role.roleId === 1) {
                    $("#screener-div").show();
                     $("#login").hide();
                     $("#resetPassword").hide();
                    
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
                        
                if (email.length === 0) {
                    $('#resetPasswordErr').show();
                    $('#resetPasswordErr').text("Please enter your email address.");
                }
                if (password.length === 0) {
                   $('#resetPasswordErr').show();
                   $('#resetPasswordErr').text("Please enter your password. If you do not know your password, please contact your branch administrator for further assistance.");
                }
                        //$("#messages").text("You must select an item");
                        //resetMessagesStatus();
                        //$("#messages").addClass("warning");
    
    
                console.log(password);

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

//                if (response.role.roleId === 2) {
//                     $("#screener-div").show();
//                     $("#login").hide();
//                } else if (response.role.roleId === 1) {
//                    $("#screener-div").show();
//                    $("#login").hide();
//                    //window.location.replace('/dashboard.html');
//                }
                        //return false;
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
        };
   
    
 

    function clearLogin() {
        $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
        });
    };

//================ SURVEY ==========================//

//if user is NOT coming in to the office: 
$("#q1No").on("click", function (e) {
    e.preventDefault();
    $("#screener-div").hide();
    $("#survey-bye").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
   
    console.log(user);
    email = user.email;
    password = user.passwords;
    
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
        $("#survey-bye").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        //console.log(isAuthorized);
    } else if (answerTwo === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        //console.log(isAuthorized);
    } else if (answerThree === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        //console.log(isAuthorized);
    } else {
        $("#survey-bye").hide();
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
        loadArrivals();
    } else if (isAuthorized === false) {
        notAuthorized();
    }
});

function notAuthorized() {
        console.log(user);
        email = user.email;
        //password = user.defaultPW;
        password = user.passwords;
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
//            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "isAttending": true,
                "isAuthorized": false,
                user: user
            }),

        headers: {
            "email": email,
            "password": password,
            "content-type": "application/json"
        },
        success: function (response, status) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);

        }
    });
}
var startTime;

function loadArrivals() {
    console.log(user);
    email = user.email;
    password = user.passwords;
    console.log(password);
    locationId = user.location.locationId;
    //var userId = user.userId;
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
            var i;
 
            $.each(response, function (i, time) {
                if (response[i].isTaken === false) {
                    var startTime = response[i].startTime;
                    startTime = startTime.substring(0, 5).trim();
                    var hour = startTime.substring(0, 2).trim();

                    var timeSlotId = response[i].timeSlotId;
//                   
                    var arrivalBtn = "<div class='col-3'>";
                    arrivalBtn = "<button class='btn-primary btn-lg time' id='" + timeSlotId + "'>";
                    arrivalBtn += "<p class='item' id=p' "+timeSlotId+"'>" + startTime + "</p>";
                    arrivalBtn += "</button>";
                    arrivalBtn += "</div>";
                    arrivalDiv.append(arrivalBtn);
                }
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
                console.log(timeSlotId);
                console.log(user);
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/api/users/arrival/" + timeSlotId,
                    contentType: "application/json;charset=UTF-8",
                    data: JSON.stringify(
                        user                       
                    ),
                    headers: {
                        "email": email,
                        "password": password
                    },

                    success: function (response) {
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
    email = user.email;
    password = user.passwords;
    locationId = user.location.locationId;
    userId = user.userId;
    
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
                
                    var departureBtn = "<div class='col-3'>";
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
                        $('#overall-success').show();
                        $('#overall-success').text("Thanks, your response has been recorded.");
                        
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
        console.log(user);
        email = user.email;
        password = user.passwords;
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                     "isAttending": true,
                     "isAuthorized": true,
                     user: user
                }),
        headers: {
            "email": email,
            "password": password
        },
        success: function (response) {
            //alert('success - attending:' + response.isAttending + 'authorized: ' +response.isAuthorized);
            console.log(response);
        },
        error: function (err) {
            //alert('error' + err);
            console.log(err);
        }
    });
}
 
});

function showGuidelines() {
    var x = document.getElementById("guidelinesDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}