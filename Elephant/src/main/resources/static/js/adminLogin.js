//var email;
//var password;
var userId;
var user;
var userLocation;
var locationName;
var locationId;
var cityName;
var allLocations;//for returned list of all location objects
var attendanceLocation; // for selected location choice

var adminLocation;
var adminLocationName;
var allLocations;
var adminId;
var adminEmail;
var adminPassword;
var user;
var adminRoleId;
var guestAnswerOne = false;
var guestAnswerTwo = false;
var guestAnswerThree = false;

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
    $("#loginNav").show();
    
    
    //$("#adminLoginDiv").show();
    //$("#loginErr").hide();
    $("#navBarDiv").hide();
    $("#dashboardDiv").hide();
    $("#allEmployeesDiv").hide();
    $("#reportDiv").hide();
    $("#adminGuidelinesDiv").hide();
    $("#createAccountDiv").hide();
    $("#createGuestDiv").hide();
    $("#createLocationDiv").hide();
    $("#employeeInfoDiv").hide();
    $("#guestAttendingDiv").hide();
    $("#healthSurveyDiv").hide();
    $("#overall-success").hide();
    $("#screener-div").hide();
    $("#survey-div").hide();
    $("#screener-bye").hide();
    $("#survey-bye").hide();
    $("#deleteEmployeeDiv").hide();
    $("#locationInfoDiv").hide();
    $('#time-success').hide();
    $("#loginErr").hide();
    $("#resetPasswordAdmin").hide();
    $("#edit-hashed-password").hide();
    $("#reportDiv").hide();


$("#submitLoginButton").click(function (e) {
    e.preventDefault();
    checkPassword();
    //password = $("#inputPassword").val();
    //email = $("#inputEmail").val();
});


//1. get username and password and check to see if it's correct in DB
function checkPassword() {
    adminPassword = $("#inputPassword").val();
    adminEmail = $("#inputEmail").val();

    $.ajax({
        type: "post",
        url: "http://localhost:8080/api/users/login",
        headers: {
            "email": adminEmail,
            "password": adminPassword,
            "content-type": "application/json"
        },
            success: function (response) {
                 user = response;
                 console.log(user);
                if (user.role.roleId === 2) {
                    let errorMessage = confirm("You have attempted to log in to the Admin Dashboard without admin privileges, you will now be routed to the user login.");

                    if (errorMessage === true) {
                        window.location.replace('/index.html');
                    }

                } else if (user.role.roleId === 1 || user.role.roleId === 3) {
                    adminLocation = user.location.locationId;
                    adminLocationName =user.location.cityName;
                    adminId = user.userId;
                    //adminEmail = user.email;
                    //adminPassword = user.defaultPW;
                    userId = user.userId;
                    firstName = user.firstName;
                    adminRoleId = user.role.roleId;
                    checkChange();
                }
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
            "email": adminEmail,
            "password": adminPassword,
            "content-type": "application/json"
        },
        success: function (response) {

            if (response === true) {
                console.log('changed password is ' + response + ' success, password has been changed');
                password = $("#inputPassword").val();
                $('#dashboardBtn').click();
                getSurveyAttendanceLocation();
              
                //$("#screener-div").show();
                $("#adminLoginDiv").hide();
                $("#resetPassword").hide();
                

            } else if (response === false) {
                console.log('changed password is ' + response + ' please change password');
                resetPassword();
                $("#screener-div").hide();
                $("#resetHeading").html("Welcome, " + firstName + "! </br> Since it's your first time logging in, please change your password.");
                $("#resetEmailInput").val(adminEmail);
                $("#resetPasswordInput").val(adminPassword);
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
    $("#adminLoginDiv").hide();
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

    var newPassword = $("#newPassword").val();
    var newPasswordConfirm = $("#newPasswordConfirm").val();
    if(newPassword.length >= 8 && newPasswordConfirm.length >= 8){
    console.log('long enough');
    
    var compareNewPasswordInput = newPassword.localeCompare(newPasswordConfirm);

    console.log(compareNewPasswordInput);
    if (compareNewPasswordInput === 0) {
        console.log('password input matches - ' + compareNewPasswordInput);
        // then check if new password string is equal to old password 
        var validChangedPassword = adminPassword.localeCompare(newPasswordConfirm);
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
    console.log(adminPassword);
    console.log(user);
    //user.passwords = password;
    console.log(user.passwords);
     
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users/editUser",
        data: JSON.stringify(user),
        headers: {
            "email": adminEmail,
            "password": adminPassword,
            "content-type": "application/json"
        },
        success: function (response) {
            adminPassword = user.passwords;
            $('#dashboardBtn').click();
            getSurveyAttendanceLocation();
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

function clearLogin() {
    $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
    });
};

    function getSurveyAttendanceLocation(){
        locationId = user.location.locationId;
        userLocation = user.location.cityName;
        console.log(locationId);
        console.log(userLocation);
        console.log(adminPassword);
        console.log(adminEmail);
        
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/users/locations',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
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

//$(document).ready(function () {

//    var adminLocation;
//    var adminLocationName;
//    var allLocations;
//    var adminId;
//    var adminEmail;
//    var adminPassword;
//    var user;
//    var adminRoleId;
//    var guestAnswerOne = false;
//    var guestAnswerTwo = false;
//    var guestAnswerThree = false;

//    $("#loginNav").show();
//    $("#adminLoginDiv").show();
//    $("#loginErr").hide();
//    $("#navBarDiv").hide();
//    $("#dashboardDiv").hide();
//    $("#allEmployeesDiv").hide();
//    $("#reportDiv").hide();
//    $("#adminGuidelinesDiv").hide();
//    $("#createAccountDiv").hide();
//    $("#createGuestDiv").hide();
//    $("#createLocationDiv").hide();
//    $("#employeeInfoDiv").hide();
//    $("#guestAttendingDiv").hide();
//    $("#healthSurveyDiv").hide();
//    $("#overall-success").hide();
//    $("#screener-div").hide();
//    $("#survey-div").hide();
//    $("#screener-bye").hide();
//    $("#survey-bye").hide();
//    $("#deleteEmployeeDiv").hide();
//    $("#locationInfoDiv").hide();
//    $('#time-success').hide();
//    $("#loginErr").hide();
//    $("#resetPasswordAdmin").hide();
//    $("#edit-hashed-password").hide();
//    $("#reportDiv").hide();


//    $("#submitLoginButton").click(function (e) {
//        e.preventDefault();
//        var password = $("#inputPassword").val();
//        var email = $("#inputEmail").val();
//
//        $.ajax({
//            type: "post",
//            url: "http://localhost:8080/api/users/login",
//            headers: {
//                "email": email,
//                "password": password
//            },
//            success: function (response) {
//                console.log(response);
//                if (response.role.roleId === 2) {
//                    let errorMessage = confirm("You have attempted to log in to the Admin Dashboard without admin privileges, you will now be routed to the user login.");
//        
//                    if (errorMessage === true) {
//                         window.location.replace('/index.html');
//                     }
// 
//                } else if (response.role.roleId === 1 || response.role.roleId === 3) {
//                    adminLocation = response.location.locationId;
//                    adminLocationName = response.location.cityName;
//                    adminId = response.userId;
//                    adminEmail = response.email;
//                    adminPassword = response.defaultPW;
//                    user = response;
//                    adminRoleId = response.role.roleId;
//                    
//                    $.ajax({
//                        type: 'GET',
//                        url: 'http://localhost:8080/api/admin/locations',
//                        headers: {
//                                 'email': adminEmail,
//                                 'password': adminPassword
//                             },
//                        success: function (data) {
//                            allLocations = data;
//                            console.log(allLocations);
//                        },
//                        error: function (http) {
//                            console.log(http);
//                            console.log('An error resulted when attempting to retrieve locations.');
//                        }
//                    });
//                    $('#dashboardBtn').click();
//                }
//
//            },
//            error: function (err) {
//                console.log(err);
//                $('#loginErr').show();
//                $('#loginErr').text("Either your username or password is incorrect. Please contact your branch administrator if you need assistance.");
//                clearLogin();
//                return false;
//            }
//
//        });
//        return false;
//    });


    
    $('#takeSurveyBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").show();
        $("#overall-success").hide();
        $("#screener-div").show();
        $("#survey-div").hide();
        $("#screener-bye").hide();
        $("#survey-bye").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $('#time-success').hide();
        $("#loginErr").hide();  
        
    });
    
    $('#adminGuidelinesBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").show();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#screener-div").hide();
        $("#survey-div").hide();
        $("#screener-bye").hide();
        $("#survey-bye").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $('#time-success').hide();
        $("#loginErr").hide();  
        
    });
    
$('#dashboardBtn').click(function (event) {
        locationId = user.location.locationId;
        userLocation = user.location.cityName;
        
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").show();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
       
        $("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        $("#allAuthErrorMessages").hide();
        $("#arrivalErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();
        $('#allAuthPendRows').empty();
        $('#arrivalRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');
        var allAuthPendRows = $('#allAuthPendRows');
        var arrivalRows = $('#arrivalRows');
        
        $('#dashLocationOption').empty();

        if (adminRoleId === 3) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/admin/locations',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data) {
                    $('#dashLocationOption')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName));
                    $.each(data, function(index, datum) {
//                        console.log(data);
                        if (datum.cityName !== adminLocationName) {
                           $('#dashLocationOption')
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

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/admin/flaggedGlobal',
                headers: {
                   'email': adminEmail,
                   'password': adminPassword
                },
                success: function (data) {
                    $.each(data, function (index, user) {
                   var allName = user.firstName + ' ' + user.lastName;
                   var allEmail = user.email;
                   var allLocation = user.location.cityName;

                   var row = '<tr>';
                   row += '<td>' + allName + '</td>';
                   row += '<td>' + allEmail + '</td>';
                   row += '<td>' + allLocation + '</td>';
                   row += '</tr>';
                   allAuthPendRows.append(row);
               });

                },
                error: function() {
               $('#allAuthErrorMessages')
                   .append($('<li>')
                   .attr({class: 'list-group-item list-group-item-danger'})
                   .text('An error has occurred.'));
                }
            });
        }  
        else if (adminRoleId === 1) {
            $('#allAuthPendTableDiv').hide();
            $('#locationDashPage').hide();
            $('#dashLocationOption')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName));
        }

         $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/noAnswers/' + locationId,
             headers: {
                 'email': adminEmail,
                 'password': adminPassword
             },
             success: function (data) {
                 $.each(data, function (index, user) {
                var name = user.firstName + ' ' + user.lastName;
                var email = user.email;
                var location = user.location.cityName;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + email + '</td>';
                row += '<td>' + location + '</td>';
                row += '</tr>';
                noResponseRows.append(row);
            });
            
             },
             error: function() {
            $('#noResErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }
         });

         $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/flagged/' + locationId,
             headers: {
                'email': adminEmail,
                'password': adminPassword
             },
             success: function (data) {
                 $.each(data, function (index, user) {
                var name = user.firstName + ' ' + user.lastName;
                var email = user.email;
                var location = user.location.cityName;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + email + '</td>';
                row += '<td>' + location + '</td>';
                row += '</tr>';
                authPendRows.append(row);
            });
            
             },
             error: function() {
            $('#authErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }
         });

        $.ajax({
             type: 'GET',
                 url: 'http://localhost:8080/api/admin/occupants/' + locationId,
                 headers: {
                     'email': adminEmail,
                     'password': adminPassword
                 },
                 success: function (data) {
                     $.each(data, function(index, datum) {
                    var name = datum.user.firstName + ' ' + datum.user.lastName;
                    var id = datum.user.userId;
                    var location = datum.location.cityName;
                    var status = datum.departedEarly;
                    if (status == true) {
                        status = "Left Early";
                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + status + '</td>';
                        row += '<td></td>';
                        row += '</tr>';
                        arrivalRows.append(row);
                    } if (status == false) {
                        status = "In Office";
                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + status + '</td>';
                        row += '<td><button onclick="departEarly(' + id + ')" class="btn btn-primary">Left Early</button></td>';
                        row += '</tr>';
                        arrivalRows.append(row);
                    }

                     });
                 },
                 error: function() {
                $('#arrivalErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }
        });  
    });
    
    $('#submitDashLocOption').click(function (event) { 
        var option = $('#dashLocationOption').val();
        $("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        $("#allAuthErrorMessages").hide();
        $("#arrivalErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();
        $('#allAuthPendRows').empty();
        $('#arrivalRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');
        var allAuthPendRows = $('#allAuthPendRows');
        var arrivalRows = $('#arrivalRows');
        
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/admin/flaggedGlobal',
            headers: {
               'email': adminEmail,
               'password': adminPassword
            },
            success: function (data) {
                $.each(data, function (index, user) {
                    var allName = user.firstName + ' ' + user.lastName;
                    var allEmail = user.email;
                    var allLocation = user.location.cityName;

                    var row = '<tr>';
                    row += '<td>' + allName + '</td>';
                    row += '<td>' + allEmail + '</td>';
                    row += '<td>' + allLocation + '</td>';
                    row += '</tr>';
                    allAuthPendRows.append(row);
                });

            },
            error: function() {
                $('#allAuthErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }
        });

        $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/noAnswers/' + option,
             headers: {
                 'email': adminEmail,
                 'password': adminPassword
             },
             success: function (data) {
                 $.each(data, function (index, user) {
                    var name = user.firstName + ' ' + user.lastName;
                    var email = user.email;
                    var location = user.location.cityName;

                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + email + '</td>';
                    row += '<td>' + location + '</td>';
                    row += '</tr>';
                    noResponseRows.append(row);
                });
            
             },
             error: function() {
                $('#noResErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }
         });

         $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/flagged/' + option,
             headers: {
                'email': adminEmail,
                'password': adminPassword
             },
             success: function (data) {
                 $.each(data, function (index, user) {
                    var name = user.firstName + ' ' + user.lastName;
                    var email = user.email;
                    var location = user.location.cityName;

                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + email + '</td>';
                    row += '<td>' + location + '</td>';
                    row += '</tr>';
                    authPendRows.append(row);
                });
             },
             error: function() {
                $('#authErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
             }
         });

       $.ajax({
             type: 'GET',
                 url: 'http://localhost:8080/api/admin/occupants/' + option,
                 headers: {
                     'email': adminEmail,
                     'password': adminPassword
                 },
                 success: function (data) {
                     $.each(data, function(index, datum) {
                    var name = datum.user.firstName + ' ' + datum.user.lastName;
                    var id = datum.user.userId;
                    var location = datum.location.cityName;
                    var status = datum.departedEarly;
                    if (status == true) {
                        status = "Left Early";
                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + status + '</td>';
                        row += '<td></td>';
                        row += '</tr>';
                        arrivalRows.append(row);
                    } if (status == false) {
                        status = "In Office";
                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + status + '</td>';
                        row += '<td><button onclick="departEarly(' + id + ')" class="btn btn-primary">Left Early</button></td>';
                        row += '</tr>';
                        arrivalRows.append(row);
                    }

                     });
                 },
                 error: function() {
                $('#arrivalErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }
        }); 
        
    });
    
    $('#logoBtn').click(function (event) {
        $('#dashboardBtn').click();
    });
    
    $('#employeesBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#reportDiv").hide();
        
        $("#errorMessages").hide();
        $("#inactiveErrorMessages").hide();
        $("#guestErrorMessages").hide();
        $("#inactiveEmployees").hide();
        $("#guests").hide();
        $("#activeEmployees").show();
        $('#employeeOption').val(1);

        $('#contentRows').empty();
        $('#inactiveRows').empty();
        $('#guestRows').empty();

        var contentRows = $('#contentRows');
        var inactiveRows = $('#inactiveRows');
        var guestRows = $('#guestRows');
        var password = $("#inputPassword").val();
        var email = $("#inputEmail").val();
        var locationId = adminLocation;
        
        $('#employeeLocationOption').empty();
            
        if (adminRoleId === 3) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/admin/locations',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data) {
                    $('#employeeLocationOption')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName)); 
                    $.each(data, function(index, datum) {
                        // console.log(data);
                        if (datum.cityName !== adminLocationName) {
                        $('#employeeLocationOption')
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
        }  
        else if (adminRoleId === 1) {
            $('#locationEmployeePage').hide();
            $('#employeeLocationOption')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName));  
        }
        
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/admin/users/" + locationId,
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data, status) {
                $.each(data, function (index, user) {
                    var name = user.firstName + ' ' + user.lastName;
                    var email = user.email;
                    var location = user.location.cityName;
                    var id = user.userId;
                    var active = user.isActive;

                    if (active === true) {

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + email + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td><button onclick="editSelectedUser(' + id + ')" class="btn btn-info">Edit</button></td>';
                        row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Deactivate</button></td>';

                        row += '</tr>';
                        contentRows.append(row);
                    }
                });

            },
            error: function() {
                $('#errorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }

        });
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/admin/users/" + locationId,
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data, status) {
                $.each(data, function (index, user) {
                    var inactiveName = user.firstName + ' ' + user.lastName;
                    var inactiveEmail = user.email;
                    var inactiveLocation = user.location.cityName;
                    var inactiveId = user.userId;
                    var inactiveActive = user.isActive;

                    if (inactiveActive === false) {

                        var row = '<tr>';
                        row += '<td>' + inactiveName + '</td>';
                        row += '<td>' + inactiveEmail + '</td>';
                        row += '<td>' + inactiveLocation + '</td>';
                        row += '<td><button onclick="activateUser(' + inactiveId + ')" class="btn btn-danger">Activate</button></td>';

                        row += '</tr>';
                        inactiveRows.append(row);
                    }
                });
            },
            error: function() {
                $('#inactiveErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }

        });

        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/admin/guests/" + locationId,
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data, status) {
                $.each(data, function (index, user) {
                    var guestName = user.firstName + ' ' + user.lastName;
                    var guestEmail = user.email;
                    var guestPhone = user.phoneNumber;
                    var guestLocation = user.location.cityName;
                    var guestId = user.userId;

                        var row = '<tr>';
                        row += '<td>' + guestName + '</td>';
                        row += '<td>' + guestEmail + '</td>';
                        row += '<td>' + guestPhone + '</td>';
                        row += '<td>' + guestLocation + '</td>';
                        row += '<td><button onclick="guestAttend(' + guestId + ')" class="btn btn-info">Coming to Office</button></td>';

                        row += '</tr>';
                        guestRows.append(row);
                   
                });
            },
            error: function() {
                $('#guestErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }

        });

    });
    
    
   $('#submitEmployeeOption').click(function (event) {  
       var option = $('#employeeOption').val();
       
        $('#q1guest').bootstrapToggle('off');
        $('#q2guest').bootstrapToggle('off');
        $('#q3guest').bootstrapToggle('off');
        
        $('#q1newGuest').bootstrapToggle('off');
        $('#q2newGuest').bootstrapToggle('off');
        $('#q3newGuest').bootstrapToggle('off');
        
       if (option == 1) {
            $("#activeEmployees").hide();
            $("#inactiveEmployees").hide();
            $("#guests").hide();
            $("#activeEmployees").show();
        }
        if (option == 2) {
            $("#activeEmployees").hide();
            $("#inactiveEmployees").hide();
            $("#guests").hide();
            $("#inactiveEmployees").show();
        }
        if (option == 3) {
            $("#activeEmployees").hide();
            $("#inactiveEmployees").hide();
            $("#guests").hide();
            $("#guests").show();
        }
  });
  
    $('#submitEmployeeLocOption').click(function (event) {  
       var option = $('#employeeLocationOption').val();
       $("#errorMessages").hide();
        $("#inactiveErrorMessages").hide();
        $("#guestErrorMessages").hide();
        $("#inactiveEmployees").hide();
        $("#guests").hide();
        $("#activeEmployees").show();
        $('#employeeOption').val(1);
        

        $('#contentRows').empty();
        $('#inactiveRows').empty();
        $('#guestRows').empty();
        
            var contentRows = $('#contentRows');
            var inactiveRows = $('#inactiveRows');
            var guestRows = $('#guestRows');
            var password = $("#inputPassword").val();
            var email = $("#inputEmail").val();

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/admin/users/" + option,
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data, status) {
                    $.each(data, function (index, user) {
                        var name = user.firstName + ' ' + user.lastName;
                        var email = user.email;
                        var location = user.location.cityName;
                        var id = user.userId;
                        var active = user.isActive;
                        
                        if (active === true) {

                            var row = '<tr>';
                            row += '<td>' + name + '</td>';
                            row += '<td>' + email + '</td>';
                            row += '<td>' + location + '</td>';
                            row += '<td><button onclick="editSelectedUser(' + id + ')" class="btn btn-info">Edit</button></td>';
                            row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Deactivate</button></td>';

                            row += '</tr>';
                            contentRows.append(row);
                        }
                    });


                },
                error: function() {
                    $('#errorMessages')
                        .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('An error has occurred.'));
                }

            });
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/admin/users/" + option,
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data, status) {
                    $.each(data, function (index, user) {
                        var inactiveName = user.firstName + ' ' + user.lastName;
                        var inactiveEmail = user.email;
                        var inactiveLocation = user.location.cityName;
                        var inactiveId = user.userId;
                        var inactiveActive = user.isActive;
                        
                        if (inactiveActive === false) {

                            var row = '<tr>';
                            row += '<td>' + inactiveName + '</td>';
                            row += '<td>' + inactiveEmail + '</td>';
                            row += '<td>' + inactiveLocation + '</td>';
                            row += '<td><button onclick="activateUser(' + inactiveId + ')" class="btn btn-danger">Activate</button></td>';

                            row += '</tr>';
                            inactiveRows.append(row);
                        }
                    });

                },
                error: function() {
                    $('#inactiveErrorMessages')
                        .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('An error has occurred.'));
                }

            });
            
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/admin/guests/" + option,
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data, status) {
                $.each(data, function (index, user) {
                    var guestName = user.firstName + ' ' + user.lastName;
                    var guestEmail = user.email;
                    var guestPhone = user.phoneNumber;
                    var guestLocation = user.location.cityName;
                    var guestId = user.userId;

                        var row = '<tr>';
                        row += '<td>' + guestName + '</td>';
                        row += '<td>' + guestEmail + '</td>';
                        row += '<td>' + guestPhone + '</td>';
                        row += '<td>' + guestLocation + '</td>';
                        row += '<td><button onclick="guestAttend(' + guestId + ')" class="btn btn-info">Coming to Office</button></td>';

                        row += '</tr>';
                        guestRows.append(row);
                   
                });
            },
            error: function() {
                $('#guestErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            }

        });
        
  });
  
  $('#submitGuestAttendBtn').click(function (event) {
      
      $('#attendErrorMessages').empty();
       
      $('#guestRows').empty();

        var errorCount = 0;

        var guestRows = $('#guestRows');
      
      var host = $("#guest-visiting").val();
      var misc = $("#guest-misc").val();
      var guestId = $("#guestId").val();
      var guest;
      var location;
      
      if (host.length < 1 || host.length > 125) {
            $('#attendErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('"Who is the guest visiting today" must be between 1 and 125 characters. Please enter a response that fits these parameters.'));
            errorCount += 1;
        }
        
        if (misc.length > 255) {
            $('#attendErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Miscellaneous information must be less than 255 characters. Please enter a response that fits this parameter.'));
            errorCount += 1;
        }
        
        if (guestAnswerOne == true || guestAnswerTwo == true || guestAnswerThree == true) {
            $('#attendErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Guests are only permitted into the office if they answer "No" to all health survey questions.'));
            errorCount += 1;
        }
        
        if(errorCount == 0) {
      
            $.ajax({
              type: 'GET',
              url: 'http://localhost:8080/api/admin/user/' + guestId,
              headers: {
                   'email': adminEmail,
                   'password': adminPassword
               },
              success: function(data, status) {
                    guest = data;
                    location = data.location;

                      $.ajax({
                          type: "POST",
                          url: "http://localhost:8080/api/admin/signUpGuest",
                          contentType: "application/json;charset=UTF-8",
                          data: JSON.stringify({
                              "isAttending": true,
                              "isAuthorized": true,
                              "visitingHost": host,
                              "miscInfo": misc,
                              user : guest,
                              location : location

                          }),

                          headers: {
                              "email": adminEmail,
                              "password": adminPassword
                          },
                          success: function (response, status) {
                              console.log(response);
                              console.log("Attendance Success!");
                              
                              $('#attendErrorMessages').empty();
                              
                              $('#employeesBtn').click();

                          },
                          error: function (err) {
                              console.log(err);

                          }
                      }); 
                },
                error: function() {
                     console.log('Error');
                }
              });
        
      }
      
  });
  
//      $('#submitEmployeeInfoBtn').click(function (event) {
//
//        $('#editErrorMessages').empty();
//
//        var errorCount = 0;
//        
//        var userIdField = $('#edit-userId').val();
//        var firstNameField = $('#edit-first-name').val();
//        var lastNameField = $('#edit-last-name').val();
//        var emailField = $('#edit-email').val();
//        var locationIdField = $('#edit-location').val();
//        var cityNameField = allLocations[locationIdField - 1].cityName;
//        var timeIncrementField =  allLocations[locationIdField - 1].timeIncrement;
//        var maxOccupancyField = allLocations[locationIdField - 1].maxOccupancy;
//        var beginningTimeField = allLocations[locationIdField - 1].beginningTime;
//        var endTimeField = allLocations[locationIdField - 1].endTime;
//        var roleIdField = $('#edit-role').val();
//        var roleNameField;
//
//        if(roleIdField == 1) {
//            roleNameField = "ROLE_ADMIN";
//        } else {
//            roleIdField = 2;
//            roleNameField = "ROLE_USER";
//        }
//
//        
//      
//
//            var userObj = {
//                "userId": userIdField,
//                "firstName": firstNameField,
//                "lastName": lastNameField,
//                "email": emailField,
//                "location": {
//                    "locationId": locationIdField,
//                    "cityName": cityNameField,
//                    "timeIncrement": timeIncrementField,
//                    "maxOccupancy": maxOccupancyField,
//                    "beginningTime": beginningTimeField,
//                    "endTime": endTimeField
//                },
//                "role": {
//                    "roleId": roleIdField,
//                    "name": roleNameField
//                }
//            }
//
//            console.log(userObj);
//
//            $.ajax({
//                type: 'POST',
//                url: 'http://localhost:8080/api/admin/editUser',
//                headers: {
//                    'email': adminEmail,
//                    'password': adminPassword,
//                    'Content-Type': 'application/json'
//                },
//                data: JSON.stringify(userObj),
//                success: function (data) {
//                    console.log(data);
//                    console.log('The user information associated with ' + data.firstName + ' ' + data.lastName + ' was updated.');
//
//                    $('#employeesBtn').click();
//                },
//                error: function (http) {
//                    console.log('An error resulted when attempting to edit the specified user.')
//                }
//            });
//      
//        
//    });

    $('#reportingBtn').click(function (event) {  
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").show();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        

        $("#attendanceNameTableHeader").empty();
        $("#attendance-message").empty();
        
        $('#reportLocationOption').empty();
        
        loadReportDiv(adminLocation);
        console.log(adminLocation);
        console.log(adminRoleId);
        $("#reportDiv").show();
        
        
        
        if (adminRoleId === 1) {
            console.log(adminRoleId);
            $('#reportLocationOption').val(1);
            //$('#locationReportPage').show();
            $('#reportLocationOption')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName));
                        
            $('#submitReportLocOption').click();
                        
        }
        
        else if (adminRoleId === 3) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/admin/locations',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data) {
                    allLocations = data;
                    
                    console.log(allLocations);
                    console.log('checkSuperAdmin func success');
                    
                    $('#reportLocationOption')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName));
                    
                    $.each(data, function(index, datum) {
                        if (datum.cityName !== adminLocationName) {
                            $('#reportLocationOption')
                                .append($("<option></option>")
                                    .attr("value", index + 1)
                                    .text(datum.cityName));
                        }
                    });

                $('#submitReportLocOption').click();

                },
                error: function (http) {
                $('#reportErrorMessages')
                      .append($('<li>')
                      .attr({class: 'list-group-item list-group-item-danger'})
                      .text('An error has occurred.'));
                setTimeout(function() {
                $('#reportErrorMessages').fadeOut('fast');
                     }, 2000);
                
                    console.log(http + 'An error resulted when attempting to retrieve locations.');
                }
            });
        }  
        
        
        
    });  
        
        
//       $('#submitReportLocOption').click(function (event) {  
//       var option = $('#reportLocationOption').val();
//       console.log(option);
//         });

    
    $('#createEmployeeBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").show();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#overall-success").hide();
        
        $('#createAccountErrorMessages').empty();

        $('#locationAddUser').empty();

        $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/locations',
                    headers: {
                        'email': adminEmail,
                         'password': adminPassword
                    },
                    success: function (data) {
                        console.log(data);
                        $.each(data, function(index, datum) {
                            $('#locationAddUser')
                                .append($("<option></option>")
                                    .attr("value", index + 1)
                                    .text(datum.cityName));
                        });
                    },
                    error: function (http) {
                        console.log(http);
                        console.log('An error resulted when attempting to retrieve locations.');
                    }
                });

    });
    
    $('#createGuestBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createGuestDiv").show();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#overall-success").hide();

        $('#locationAddGuest').empty();
        
        $('#createGuestErrorMessages').empty();
        
        guestAnswerOne = false;
        guestAnswerTwo = false;
        guestAnswerThree = false;

        toggleNewGuest();

        function toggleNewGuest() {
            $('#q1newGuest').change(function () {
                guestAnswerOne = $(this).prop('checked');
                console.log("Q1 Guest: " + guestAnswerOne);
            });

            $('#q2newGuest').change(function () {
                guestAnswerTwo = $(this).prop('checked');
                console.log("Q2 Guest: " + guestAnswerTwo);
            });
            $('#q3newGuest').change(function () {
                guestAnswerThree = $(this).prop('checked');
                console.log("Q3 Guest: " + guestAnswerThree);
            });
        }

        $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/locations',
                    headers: {
                        'email': adminEmail,
                         'password': adminPassword
                    },
                    success: function (data) {
                        
                        
                    $('#locationAddGuest')
                            .append($("<option></option>")
                                .attr("value", adminLocation)
                                .text(adminLocationName));
                    $.each(data, function(index, datum) {
//                        console.log(data);
                        if (datum.cityName !== adminLocationName) {
                           $('#locationAddGuest')
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

    });
    
    $('#locationBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").show();
        $("#reportDiv").hide();
        
        $("#editLocErrorMessages").hide();

        var userId = adminId;

        $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/user/' + userId,
        headers: {
             'email': adminEmail,
             'password': adminPassword
         },
        success: function(data, status) {
              $('#edit-city-name').val(data.location.cityName);
              $('#edit-occupancy').val(data.location.maxOccupancy);
          },
          error: function() {
            $('#editLocErrorMessages')
               .append($('<li>')
               .attr({class: 'list-group-item list-group-item-danger'})
               .text('An error has occurred.  Please try again later.'));
          }
        });

    });
    
    $('#logoutBtn').click(function (event) {
        $("#loginNav").show();
        $("#adminLoginDiv").show();
        $("#loginErr").hide();
        $("#navBarDiv").hide();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#reportDiv").hide();
        location.reload();
    });
    
    $('#createAcctBtn').click(function (event) {

        $('#contentRows').empty();

        $('#createAccountErrorMessages').empty();

        var errorCount = 0;

        var contentRows = $('#contentRows');
        var password = $("#inputPassword").val();
        var email = $("#inputEmail").val();
        var locationId = $('#locationAddUser').val();

        console.log(locationId);

        var firstNameField = $('#firstNameAddUser').val();
        var lastNameField = $('#lastNameAddUser').val();
        var emailField = $('#emailAddUser').val();
        var locationIdField = $('#locationAddUser').val();
        var cityNameField = allLocations[locationId - 1].cityName;
        var timeIncrementField = allLocations[locationId - 1].timeIncrement;
        var maxOccupancyField = allLocations[locationId - 1].maxOccupancy;
        var beginningTimeField = allLocations[locationId - 1].beginningTime;
        var endTimeField = allLocations[locationId - 1].endTime;
        var roleIdField = $('#roleAddUser').val();
        var roleNameField;
        var isActiveField = true;
        
        if(roleIdField == 1) {
            roleNameField = "ROLE_ADMIN";
        } else {
            roleNameField = "ROLE_USER";
        };

        if (firstNameField.length < 1 || firstNameField.length > 25) {
            $('#createAccountErrorMessages').append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger' })
            .text('The first name of a user must be between 1 and 25 characters. Please enter a name that fits these parameters.'));
        errorCount += 1;
        }

        if (lastNameField.length < 1 || lastNameField.length > 25) {
            $('#createAccountErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('The last name of a user must be between 1 and 25 characters. Please enter a name that fits these parameters.'));
            errorCount += 1;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField) || emailField === "") {
            $('#createAccountErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Please enter a valid email that is 50 characters or less.'));
            errorCount += 1;
        }

        if(errorCount == 0) {

            var userObj = {
                "firstName": firstNameField,
                "lastName": lastNameField,
                "email": emailField,
                "isActive": isActiveField,
                "location": {
                    "locationId": locationIdField,
                    "cityName": cityNameField,
                    "timeIncrement": timeIncrementField,
                    "maxOccupancy": maxOccupancyField,
                    "beginningTime": beginningTimeField,
                    "endTime": endTimeField
            },
                "role": {
                    "roleId": roleIdField,
                    "name": roleNameField
                }
            };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/admin/newUser',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(userObj),
                success: function (data) {
                    console.log(data);
                    console.log('The request to generate ' + data.firstName + ' ' + data.lastName + ' was successful.');

                    $('#firstNameAddUser').val("");
                    $('#lastNameAddUser').val("");
                    $('#emailAddUser').val("");

                    $('#employeesBtn').click();
                },
                error: function (http) {
                    console.log(http);
                    console.log('An error resulted when attempting to create a new user.');
                }
            });

            }

    });
        
    $('#confirmCreateGuestBtn').click(function (event) {

        $('#guestRows').empty();

        $('#createGuestErrorMessages').empty();

        var errorCount = 0;

        var guestRows = $('#guestRows');

        var locationId = $('#locationAddGuest').val();

        var firstNameField = $('#firstNameAddGuest').val();
        var lastNameField = $('#lastNameAddGuest').val();
        var emailField = $('#emailAddGuest').val();
        var phoneField = $('#phoneAddGuest').val();
        var locationIdField = $('#locationAddGuest').val();
        var host = $('#add-guest-visiting').val();
        var misc = $('#add-guest-misc').val();
        var cityNameField = allLocations[locationId - 1].cityName;
        var timeIncrementField = allLocations[locationId - 1].timeIncrement;
        var maxOccupancyField = allLocations[locationId - 1].maxOccupancy;
        var beginningTimeField = allLocations[locationId - 1].beginningTime;
        var endTimeField = allLocations[locationId - 1].endTime;
        var roleIdField = 4;
        var roleNameField = "ROLE_GUEST";
        var isActiveField = true;
        var guestId;
        var guest;
        var location;

        if (firstNameField.length < 1 || firstNameField.length > 25) {
            $('#createGuestErrorMessages').append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger' })
            .text('The first name of a guest must be between 1 and 25 characters. Please enter a name that fits these parameters.'));
        errorCount += 1;
        }

        if (lastNameField.length < 1 || lastNameField.length > 25) {
            $('#createGuestErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('The last name of a guest must be between 1 and 25 characters. Please enter a name that fits these parameters.'));
            errorCount += 1;
        }
        
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField) || emailField === "") {
            $('#createGuestErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Please enter a valid email that is 50 characters or less.'));
            errorCount += 1;
        }
        
        if (phoneField.length < 12 || phoneField.length > 12) {
            $('#createGuestErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('The phone number of a guest must have the following format: 000-000-0000. Please enter a phone number that fits these parameters.'));
            errorCount += 1;
        }
        
        if (host.length < 1 || host.length > 125) {
            $('#createGuestErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('"Who is the guest visiting today" must be between 1 and 125 characters. Please enter a response that fits these parameters.'));
            errorCount += 1;
        }
        
        if (misc.length > 255) {
            $('#createGuestErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Miscellaneous information must be less than 255 characters. Please enter a response that fits this parameter.'));
            errorCount += 1;
        }

        if (guestAnswerOne == true || guestAnswerTwo == true || guestAnswerThree == true) {
            $('#createGuestErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Guests are only permitted into the office if they answer "No" to all health survey questions.'));
            errorCount += 1;
        }

        if(errorCount == 0) {

            var userObj = {
                "firstName": firstNameField,
                "lastName": lastNameField,
                "email": emailField,
                "phoneNumber": phoneField,
                "isActive": isActiveField,
                "location": {
                    "locationId": locationIdField,
                    "cityName": cityNameField,
                    "timeIncrement": timeIncrementField,
                    "maxOccupancy": maxOccupancyField,
                    "beginningTime": beginningTimeField,
                    "endTime": endTimeField
            },
                "role": {
                    "roleId": roleIdField,
                    "name": roleNameField
                }
            };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/admin/newGuest',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(userObj),
                success: function (data) {
                    console.log(data);
                    console.log('The request to generate ' + data.firstName + ' ' + data.lastName + ' was successful.');
                    guestId = data.userId;
                    
                    $.ajax({
                        type: 'GET',
                        url: 'http://localhost:8080/api/admin/user/' + guestId,
                        headers: {
                             'email': adminEmail,
                             'password': adminPassword
                         },
                        success: function(data, status) {
                              guest = data;
                              location = data.location;

                                $.ajax({
                                    type: "POST",
                                    url: "http://localhost:8080/api/admin/signUpGuest",
                                    contentType: "application/json;charset=UTF-8",
                                    data: JSON.stringify({
                                        "isAttending": true,
                                        "isAuthorized": true,
                                        "visitingHost": host,
                                        "miscInfo": misc,
                                        user : guest,
                                        location : location

                                    }),

                                    headers: {
                                        "email": adminEmail,
                                        "password": adminPassword
                                    },
                                    success: function (response, status) {
                                        console.log(response);
                                        console.log("Attendance Success!");
                                        
                                        $('#firstNameAddGuest').val("");
                                        $('#lastNameAddGuest').val("");
                                        $('#emailAddGuest').val("");
                                        $('#phoneAddGuest').val("");
                                        $('#add-guest-visiting').val("");
                                        $('#add-guest-misc').val("");

                                        $('#employeesBtn').click();

                                    },
                                    error: function (err) {
                                        console.log(err);

                                    }
                                }); 
                          },
                          error: function() {
                               console.log('Error');
                          }
                        });
                    












                    
                },
                error: function (http) {
                    console.log(http);
                    console.log('An error resulted when attempting to create a new user.');
                }
            });

            }

        });

    $('#cancelAcctBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#overall-success").hide();
        
        $("#allEmployeeErr").hide();
    });
    
    $('#cancelGuestBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#overall-success").hide();
        
        $("#allEmployeeErr").hide();
        
        $('#employeesBtn').click();
    });
    
    $('#cancelGuestAttendBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#overall-success").hide();
        
        $('#attendErrorMessages').empty();
        
        $('#employeesBtn').click();
    });
    
    $('#submitEmployeeInfoBtn').click(function (event) {

        $('#editErrorMessages').empty();

        var errorCount = 0;
        
        var userIdField = $('#edit-userId').val();
        var firstNameField = $('#edit-first-name').val();
        var lastNameField = $('#edit-last-name').val();
        var emailField = $('#edit-email').val();
        var locationIdField = $('#edit-location').val();
        var cityNameField = allLocations[locationIdField - 1].cityName;
        var timeIncrementField =  allLocations[locationIdField - 1].timeIncrement;
        var maxOccupancyField = allLocations[locationIdField - 1].maxOccupancy;
        var beginningTimeField = allLocations[locationIdField - 1].beginningTime;
        var endTimeField = allLocations[locationIdField - 1].endTime;
        var roleIdField = $('#edit-role').val();
        var roleNameField;

        if(roleIdField == 1) {
            roleNameField = "ROLE_ADMIN";
        } else {
            roleIdField = 2;
            roleNameField = "ROLE_USER";
        }

        if (firstNameField.length < 1 || firstNameField.length > 25) {
            $('#editErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('The first name of a user must be between 1 and 25 characters. Please enter a name that fits these parameters.'));
            errorCount += 1;
        }

        if (lastNameField.length < 1 || lastNameField.length > 25) {
            $('#editErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('The last name of a user must be between 1 and 25 characters. Please enter a name that fits these parameters.'));
            errorCount += 1;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField) || emailField === "") {
            $('#editErrorMessages').append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger' })
                .text('Please enter a valid email that is 50 characters or less.'));
            errorCount += 1;
        }
        
        if(errorCount == 0) {

            var userObj = {
                "userId": userIdField,
                "firstName": firstNameField,
                "lastName": lastNameField,
                "email": emailField,
                "location": {
                    "locationId": locationIdField,
                    "cityName": cityNameField,
                    "timeIncrement": timeIncrementField,
                    "maxOccupancy": maxOccupancyField,
                    "beginningTime": beginningTimeField,
                    "endTime": endTimeField
                },
                "role": {
                    "roleId": roleIdField,
                    "name": roleNameField
                }
            }

            console.log(userObj);

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/admin/editUser',
                headers: {
                    'email': adminEmail,
                    'password': adminPassword,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(userObj),
                success: function (data) {
                    console.log(data);
                    console.log('The user information associated with ' + data.firstName + ' ' + data.lastName + ' was updated.');

                    $('#employeesBtn').click();
                },
                error: function (http) {
                    console.log('An error resulted when attempting to edit the specified user.')
                }
            });
        }
        
    });

    $("#reset-password-button").click(function (e) {
        let isEdit = confirm("Please confirm that you would like to update the user's password by pressing ok. Pressing cancel will leave the user's password unchanged.");

        if(isEdit === true) {
            var userIdField = $('#edit-userId').val();

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/admin/resetPassword/' + userIdField,
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data) {
                    console.log(data);
                    $('#editErrorMessages').append($('<li>')
                    .attr({class: 'list-group-item list-group-item-success' })
                    .text('The user password was updated.'));

                    setTimeout(function() {
                        $('#editErrorMessages').empty();
                        $('#employeesBtn').click();
                    }, 2000);
                },
                error: function (http) {
                    console.log('An error resulted when attempting to reset the user password.');
                }
            });
        }
    });
    
    $('#createLocationSubmitBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").show();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#overall-success").hide();
    });

    $('#submitLocationInfoBtn').click(function (event) {
        
        var occupancy = $('#edit-occupancy').val();
        
        if (occupancy < 0) {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Max Occupancy cannot be a negative number.'));
            $("#editLocErrorMessages").show();
        } else if (occupancy === "") {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Max Occupancy must have a value.'));
            $("#editLocErrorMessages").show();
        } else if (occupancy.includes(".")) {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Max Occupancy must be a whole number.'));
            $("#editLocErrorMessages").show();
        } else {

            $.ajax({
            type: 'POST',
            url: "http://localhost:8080/api/admin/capacity/" + adminLocation + "/" + occupancy,
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data) {
                console.log(data);
                console.log('Location capacity was updated');
                
                $("#editLocErrorMessages").empty();

                $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-success'})
                    .text('The office has been successfully updated.'));
                $("#editLocErrorMessages").show();

            },
            error: function (http) {
                console.log('An error resulted when attempting to edit the location capacity.')
            }
            });
        }
    });

    //================ SURVEY ==========================//
var user;

//if user is NOT coming in to the office: 
$("#q1No").on("click", function (e) {
    e.preventDefault();
    $("#screener-div").hide();
    $("#survey-bye").hide();
   
    console.log(user);
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/users/coming",
        
        data: JSON.stringify({
            "user": user,
            "isAttending": false
            //"isAuthorized": true
            }),
        contentType: "application/json;charset=UTF-8",
        headers: {
            "email": adminEmail,
            "password": adminPassword
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
    //getSurveyAttendanceLocation();
    $("#screener-div").hide();
    $("#survey-div").show();
    $("#survey-bye").hide();
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
        console.log(isAuthorized);
    } else if (answerTwo === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        console.log(isAuthorized);
    } else if (answerThree === true) {
        isAuthorized = false;
        $("#survey-bye").show();
        console.log(isAuthorized);
    } else {
        $("#survey-bye").hide();
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
        //loadArrivals();
        authorized();
        //$('#overall-success').show();
       // $('#overall-success').text("You are authorized to come in to the office today and your response has been recorded."); 
    } else if (isAuthorized === false) {
        notAuthorized();
    }
    }); 
    
//        $.ajax({
//            type: "POST",
//            url: "http://localhost:8080/api/users/coming",
//            contentType: "application/json;charset=UTF-8",
//            data: JSON.stringify({
//                "isAttending": true,
//                "isAuthorized": true,
//                user: user
//            }),
//
//        headers: {
//            "email": adminEmail,
//            "password": adminPassword
//        },
//        success: function (response, status) {
//            console.log(response);
//        },
//        error: function (err) {
//            console.log(err);
//
//        }
   
        
    
//});

var allLocations;
var attendanceLocation;
//var user;

    function notAuthorized() {
        console.log(user);
        attendanceLocation = $('#userLocationOption').val();
        var locationObj = allLocations[(attendanceLocation - 1)];
        console.log(locationObj);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "isAttending": true,
                "isAuthorized": false,
                location : locationObj,
                user: user
            }),

        headers: {
            "email": adminEmail,
            "password": adminPassword
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
//var startTime;

    //called after departure time POST to update attendance and authorization record to true: 
    function authorized() {
        console.log(user);
        attendanceLocation = $('#userLocationOption').val();
        console.log(attendanceLocation);
        
        console.log(allLocations[attendanceLocation - 1]);
        var locationObj = allLocations[(attendanceLocation - 1)];
        console.log(locationObj);

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                     "isAttending": true,
                     "isAuthorized": true,
                     location : locationObj,
                     user: user
                }),
        headers: {
            "email": adminEmail,
            "password": adminPassword
        },
        success: function (response) {
             console.log(response);
             $("#survey-authorized").show();
             $("#survey-authorized-text").html('You are authorized to come in to the ' + response.location.cityName + ' office today.');
           
        },
        error: function (err) {
            //alert('error' + err);
            console.log(err);
        }
        });
    }

    deleteUser = function(userId) {  
        let isDelete = confirm("This user will be deactivated.");
        
        if (isDelete === true) {
            $.ajax({
                 type: 'POST',
                 url: 'http://localhost:8080/api/admin/deactivateUser/' + userId,
                 headers: {
                     'email': adminEmail,
                     'password': adminPassword
                 },
                 success: function (data) {  
                     $('#submitEmployeeLocOption').click();   
                 },
                 error: function() {
                    console.log('An error resulted when attempting to deactivate the user.');
                 }
             });
         }

    };

    activateUser = function(userId) {  
        let isActivate = confirm("This user will be activated.");

        if (isActivate === true) {
         
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/admin/reactivateUser/' + userId,
                headers: {
                    'email': adminEmail,
                    'password': adminPassword
                },
                success: function (data) {                 
                   $('#submitEmployeeLocOption').click();
                },
                error: function (http) {
                    console.log(http);
                    console.log('An error resulted when attempting to activate the user.');
                }
            });
        }
    };
    
    departEarly = function(userId) {  
        let isLeavingEarly = confirm("It will be recorded that this user left early today.");
        
        if (isLeavingEarly === true) {
            
            $.ajax({
             type: 'POST',
             url: 'http://localhost:8080/api/admin/departedEarly/' + userId,
             headers: {
                'email': adminEmail,
                'password': adminPassword
             },
             success: function(data) {
                 console.log(data);
                 $('#submitDashLocOption').click(); 
             },
             error: function(http) {
                 console.log(http);
             }
         });
         }
    };

    editSelectedUser = function(id) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").show();
        $("#guestAttendingDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();

        var userId = id;

        $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/user/' + userId,
        headers: {
                'email': adminEmail,
                'password': adminPassword
            },
        success: function(data, status) {
                $('#edit-userId').val(id);
                $('#edit-first-name').val(data.firstName);
                $('#edit-last-name').val(data.lastName);
                $('#edit-email').val(data.email);
                $('#edit-password').val(data.passwords);
                $('#edit-role').val(data.role.name);

                populateEditLocationSelect(data.location.cityName);
                populateEditRoleSelect(data.role.name);

            },
            error: function() {
            $('#editErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.  Please try again later.'));
            }
        });
                    
    };

    populateEditLocationSelect = function(currentCityName) {

        $('#edit-location').empty();

        var currentCityIndex;

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/admin/locations',
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data) {
                $.each(data, function(index, datum) {
                    $('#edit-location')
                        .append($("<option></option>")
                            .attr("value", index + 1)
                            .text(datum.cityName));

                    if(datum.cityName == currentCityName) {
                        currentCityIndex = index + 1;
                    }
                });

                $('#edit-location').val(currentCityIndex);
            },
            error: function (http) {
                console.log(http);
                console.log('An error resulted when attempting to retrieve locations.');
            }
        });

    };

    populateEditRoleSelect = function(currentRole) {

        $('#edit-role').empty();
        
        var currentRoleIndex;

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/admin/roles/',
            headers: {
                'email': adminEmail,
                'password': adminPassword
            },
            success: function (data) {
                $.each(data, function(index, datum) {
                    $('#edit-role')
                        .append($("<option></option>")
                            .attr("value", index + 1)
                            .text(datum.name));

                    if(datum.name == currentRole) {
                        currentRoleIndex = index + 1;
                    }
                });

                $('#edit-role').val(currentRoleIndex);
            },
            error: function (http) {
                console.log(http);
                console.log('An error resulted when attempting to retrieve roles.');
            }
        });

    };
    
    guestAttend = function(id) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportDiv").hide();
        $("#adminGuidelinesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createGuestDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#guestAttendingDiv").show();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        
        $("#guest-visiting").val("");
        $("#guest-misc").val("");
        
        $('#attendErrorMessages').empty();
        
        var guestId = id;
        
        guestAnswerOne = false;
        guestAnswerTwo = false;
        guestAnswerThree = false;

        toggleGuest();

        function toggleGuest() {
            $('#q1guest').change(function () {
                guestAnswerOne = $(this).prop('checked');
                console.log("Q1 Guest: " + guestAnswerOne);
            });

            $('#q2guest').change(function () {
                guestAnswerTwo = $(this).prop('checked');
                console.log("Q2 Guest: " + guestAnswerTwo);
            });
            $('#q3guest').change(function () {
                guestAnswerThree = $(this).prop('checked');
                console.log("Q3 Guest: " + guestAnswerThree);
            });
        }
       

        $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/user/' + guestId,
        headers: {
                'email': adminEmail,
                'password': adminPassword
            },
        success: function(data, status) {
                $('#guestId').val(id);
                $('#guest-name').val(data.firstName + " " + data.lastName);
                $('#guest-email').val(data.email);
            },
            error: function() {
            $('#attendErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.  Please try again later.'));
            }
        });
                    
    };

    loadReportDiv = function(){
        console.log(adminLocation);
            $("#myList").hide();
            $("#noAttendees").hide();
            $("#isAttendingTable").hide();
            //$("#reportSummaryTableDiv").hide();
            //$("#report-attendance-table").empty();
            //load users to dropdown list
            //getUsersByLocation(adminLocation);
            
            //filter search list functionality 
            $("#myInput").on("keyup", function() {
                clearReport(); 
                $("#myList").show();
                var value = $(this).val().toLowerCase();
                $("#myList li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                });
            });
        };
        
    function getAttendanceLocation(){
        locationId = user.location.locationId;
        userLocation = user.location.cityName;
        console.log(locationId);
        console.log(userLocation);
        
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/users/locations',
                headers: {
                    "email": adminEmail,
                    "password": adminPassword
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
                $('#reportErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
                setTimeout(function() {
                $('#reportErrorMessages').fadeOut('fast');
                    }, 2000);
                    console.log(http);
                    console.log(http + 'An error resulted when attempting to retrieve locations.');
                }
            });
        };
        
});

function clearLogin() {
    $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
    });
};

function showGuidelines() {
    var x = document.getElementById("guidelinesDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


    // // ********** Preparing Ajax calls Start

    // // @DeleteMapping("/user/{id}")
    // // public ResponseEntity<User> deleteUser
    // $('#deleteUser2').click(function (event) {

    //     var userId = 2;

    //     $.ajax({
    //         type: 'DELETE',
    //         url: 'http://localhost:8080/api/admin/user/' + userId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //         },
    //         error: function (http) {
    //             console.log("An error resulted when attempting to delete the specified user. As a result, the user many not have been deleted.");
    //         }
    //     });
    // });

    // // @PostMapping("/timeInterval/{id}/{startTime}/{endTime}")
    // // public ResponseEntity<Location> editDailyTimeInterval
    // $('#changeMinnTime').click(function (event) {

    //     var startTime = "05:20:00";
    //     var endTime = "17:20:00";

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/timeInterval/1/' + startTime + '/' + endTime,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The daily time interval of ' + data.cityName + ' was updated to ' + data.beginningTime + ' and ' + data.endTime + '.')
    //         },
    //         error: function (http) {
    //             console.log('An error resulted when attempting to update the daily time interval.');
    //         }
    //     });
    // });

    // // @PostMapping("/timeIncrement/{id}/{num}")
    // // public ResponseEntity<Location> editIncrement
    // $('#chaneAustinIncrement').click(function (event) {

    //     var locationId = 2;
    //     var newIncrement = 6;

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/timeIncrement/' + locationId + '/' + newIncrement,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The time slot increment of ' + data.cityName + ' was updated to ' + data.timeIncrement + ' minutes.')
    //         },
    //         error: function (http) {
    //             console.log('An error resulted when attempting to update the time increment.')
    //         }
    //     });
    // });

    // // @PostMapping("/capacity/{id}/{num")
    // // public ResponseEntity<Location> editCapacity
    // $('#chaneAustinCapacity').click(function (event) {

    //     var locationId = 2;
    //     var maxCapacity = 12;
    //     var userEmail = 'user@user.com';
    //     var userPassword = 'password';

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/capacity/' + locationId + '/' + maxCapacity,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The maximum capacity of ' + data.cityName + ' was updated to ' + data.maxOccupancy + ' people.')
    //         },
    //         error: function (http) {
    //             console.log('An error resulted when attempting to update the maximum capacity of the location.')
    //         }
    //     });
    // });


    // // @PostMapping("/editUser")
    // // public ResponseEntity<User> editUser
    // $('#editUser4').click(function (event) {

    //     var userIdField = 4;
    //     var firstNameField = 'Nate again';
    //     var lastNameField = 'Wood';
    //     var emailField = 'nate@nate.wood';
    //     var defaultPWField = 'password';
    //     var passwordsField = 'password';
    //     var locationIdField = 1;
    //     var cityNameField = 'Minneapolis';
    //     var timeIncrementField = 5;
    //     var maxOccupancyField = 20;
    //     var beginningTimeField = '07:00:00';
    //     var endTimeField = '19:00:00';
    //     var roleIdField = 2;
    //     var roleNameField = 'ROLE_USER';

    //     var userObj = {
    //         "userId": userIdField,
	//         "firstName": firstNameField,
	//         "lastName": lastNameField,
	//         "email": emailField,
    //         "defaultPW": defaultPWField,
    //         "passwords": passwordsField,
    //         "location": {
    //             "locationId": locationIdField,
    //             "cityName": cityNameField,
    //             "timeIncrement": timeIncrementField,
    //             "maxOccupancy": maxOccupancyField,
    //             "beginningTime": beginningTimeField,
    //             "endTime": endTimeField
    //     },
    //         "role": {
    //             "roleId": roleIdField,
    //             "name": roleNameField
    //         }
    //     }

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/editUser',
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password',
    //             'Content-Type': 'application/json'
    //         },
    //         data: JSON.stringify(userObj),
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The user information associated with ' + data.firstName + ' ' + data.lastName + ' was updated.');
    //         },
    //         error: function (http) {
    //             console.log('An error resulted when attempting to edit the specified user.')
    //         }
    //     });
    // });


    // // @PostMapping("/newUser")
    // // public ResponseEntity<User> createUser
    // $('#generateNewlyCreatedUser').click(function (event) {

    //     var firstNameField = 'Newly';
    //     var lastNameField = 'CreatedUser';
    //     var emailField = 'newly@anothernewly.com';
    //     var locationIdField = 1;
    //     var cityNameField = 'Minneapolis';
    //     var timeIncrementField = 5;
    //     var maxOccupancyField = 20;
    //     var beginningTimeField = '07:00:00';
    //     var endTimeField = '19:00:00';
    //     var roleIdField = 2;
    //     var roleNameField = 'ROLE_USER';

    //     var userObj = {
	//         "firstName": firstNameField,
	//         "lastName": lastNameField,
	//         "email": emailField,
    //         "location": {
    //             "locationId": locationIdField,
    //             "cityName": cityNameField,
    //             "timeIncrement": timeIncrementField,
    //             "maxOccupancy": maxOccupancyField,
    //             "beginningTime": beginningTimeField,
    //             "endTime": endTimeField
    //     },
    //         "role": {
    //             "roleId": roleIdField,
    //             "name": roleNameField
    //         }
    //     }

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/newUser',
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password',
    //             'Content-Type': 'application/json'
    //         },
    //         data: JSON.stringify(userObj),
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The request to generate ' + data.firstName + ' ' + data.lastName + ' was successful.');
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to create a new user.');
    //         }
    //     });
    // });


    // // @GetMapping("/locations")
    // // public ResponseEntity<List<Location>> getLocations
    // $('#getAllLocations').click(function (event) {

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/locations',
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The request for locations was successful.');
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve locations.');
    //         }
    //     });

    // });


    // // @GetMapping("/flagged/{id}")
    // // public ResponseEntity<List<User>> getFlagged
    // $('#getFlaggedUsers').click(function (event) {

    //     var locationId = 5;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/flagged/' + locationId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for flagged personnel was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve flagged personnel.');
    //         }
    //     });

    // });


    // // @GetMapping("/noAnswers/{id}")
    // // public ResponseEntity<List<User>> getInactiveUsers
    // $('#getInactiveUsers').click(function (event) {

    //     var locationId = 1;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/noAnswers/' + locationId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for inactive personnel was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve flagged personnel.');
    //         }
    //     });
    // });


    // // @GetMapping("/departures/{id}")
    // // public ResponseEntity<List<Departure>> getDepartures
    // $('#getDepartures').click(function (event) {

    //     var locationId = 2;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/departures/' + locationId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for scheduled departures by locationId was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve scheduled departures by locationId.');
    //         }
    //     });
    // });


    // // @GetMapping("/arrivals/{id}")
    // // public ResponseEntity<List<Arrival>> getArrivals
    // $('#getArrivals').click(function (event) {

    //     var locationId = 2;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/arrivals/' + locationId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for scheduled arrivals by locationId was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve scheduled arrivals by locationId.');
    //         }
    //     });

    // });


    // // @GetMapping("/occupants/{id}")
    // // public ResponseEntity<List<User>> getOccupants
     
    
    // $('#getOccupants').click(function (event) {

    //     var locationId = 1;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/occupants/' + locationId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for occupants by locationId was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve occupants by locationId.');
    //         }
    //     });

    // });


    // // @GetMapping("/roles")
    // // public ResponseEntity<List<Role>> getRoles
    // $('#getRoles').click(function (event) {

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/roles/',
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for roles was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve roles.');
    //         }
    //     });

    // });


var adminLocation;
//var adminEmail;
//var adminPassword;
var option;
//var locationId;
var nameInput;
var allLocations;
var locationName;
var selectedLocationId;    
        
 //if admin role is 1, set locationId equal to the admin's location 
 //if admin role is 3, show the select location div and set locationId equal to the location selected. 
       $('#submitReportLocOption').click(function (event) {  
            locationId = $('#reportLocationOption').val();
            locationName = $('#reportLocationOption').text();
            getUsersByLocation(locationId);
            clearReport();
            $("#reportSummaryTableDiv").empty();
            $("#attendanceTableHeader").empty();
            console.log(locationId);
       });
       
        function getUsersByLocation() {
            locationId = $('#reportLocationOption').val();
            console.log(locationId);
            $("#myList").empty();
            $("#myInput").val('');
            //console.log(adminEmail);
            //console.log(adminPassword);
            
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/admin/users/" + locationId,
                headers: {
                 //'email': 'user@user.com',
                 //'password': 'password'
                    'email': adminEmail,
                    'password': adminPassword
            },
            success: function (data, status) {
            console.log(data);
                    var myList = $("#myList");
                    $.each(data, function (index, user) {
                    var name = user.firstName + ' ' + user.lastName;
                            var id = user.userId;
                            var nameLi = "<li class='report-name' id=" + id + ">";
                            nameLi += '<button onclick="getAttendance(' + id + ')" class="btn report-user-select">' + name + '</button>';
                            nameLi += "</li>";
                            myList.append(nameLi);
                    });
                },
            error: function() {
            $('#reportErrorMessages')
            .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            setTimeout(function() {
            $('#reportErrorMessages').fadeOut('fast');
            }, 2000);
            }
            });
        
             $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/admin/guests/" + locationId,
                headers: {
                'email': adminEmail,
                'password': adminPassword

                },
            success: function (data, status) {
            console.log(data);
                    var myList = $("#myList");
                    $.each(data, function (index, user) {
                    var name = user.firstName + ' ' + user.lastName;
                            var id = user.userId;
                            var nameLi = "<li class='report-name' id=" + id + ">";
                            nameLi += '<button onclick="getAttendance(' + id + ')" class="btn report-user-select">' + name + '</button>';
                            nameLi += "</li>";
                            myList.append(nameLi);
                    });
            },

            error: function() {
            $('#reportErrorMessages')
            .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
            setTimeout(function() {
            $('#reportErrorMessages').fadeOut('fast');
            }, 2000);
            }

        });

        };
    
        function getAllLocations(selectedLocationId) {
            selectedLocationId--;
            console.log(selectedLocationId);
            
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/api/users/locations',
                headers: {
                    "email": adminEmail,
                    "password": adminPassword
                },
                success: function (data) {
                locationName = data[selectedLocationId].cityName; 
                  
                  //var locationName = data.locationId;
                  //var cityName = data.cityName;
                  console.log(locationName);
//                   locationId = allLocations[i].locationId;
//                   locationName = allLocations[locationId].cityName;
//                   console.log(locationId);
//                   console.log(locationName);
                },
                error: function (http) {
                $('#reportErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
                setTimeout(function() {
                $('#reportErrorMessages').fadeOut('fast');
                    }, 2000);
                    console.log(http + 'An error resulted when attempting to retrieve locations.');
                }
            });
        };
        

var day; // just day 
var month; // just month
var year; // just year 
var dateStringDisplay; //formatted to display on button
var fullDate2;
var dateStringId; //for date button id 
var selectedUserId;
var btnIdString;
var homeLocaton;
var departedEarly;

function getAttendance(userId) {
    $("#myList").hide();
    // $("#reportSummaryTableDiv").empty();
    $("#attendanceTableHeader").empty();
    $("#attendanceTableHeader").hide();

    console.log(userId);
    selectedUserId = userId;
    updateInputName(userId);

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/datesPresent/' + userId,
        headers: {
            "email": adminEmail,
            "password": adminPassword
        },
        success: function (data) {
            console.log(data);

            if (data.length === 0) {
                $("#attendance-message").html("No attendance records exist for the past 30 days.");
                console.log('this user does not have any attendance records!');
            } else if (data.length > 0)  {
                
                if (data[0].user.role.roleId === 4) {
                    
                console.log(data[0].user.role.roleId);
                userName = data[0].user.firstName + ' ' + data[0].user.lastName;
                firstName = data[0].user.firstName;
                lastName = data[0].user.lastName;
                email = data[0].user.email;
                var visitingHost = data[0].visitingHost;
                var miscInfo = data[0].miscInfo;
                
                //$("#report-attendance-table").show();
                console.log('The request for user ' + userId + ' attendance within the last 30 days was successful.');
                //$("#attendance-message").empty();
                $('#report-attendance-dates').empty();
                $("#isAttendingTable").hide();
                $("#isAttendingRow").empty();

                var guestReportSummaryTableDiv = $("#guestReportSummaryTableDiv");

                //var attendanceDateDiv = $('#report-attendance-dates');
                var guestReportSummaryTable;
                var i = 0;
                $("#attendance-message").html("Over the past 30 days, the selected guest was in the office on the following dates.<br>Click a date to view all employees and guests in the attended office.");

                var guestReportSummaryTable = '<h5 class="table-header" id="guestReportSummaryTableHeader">' + 'Office Attendance for ' + userName + '</h5>';
                guestReportSummaryTable += '<div class="col-12">';
                guestReportSummaryTable += '<table class="table table-striped" style="table-layout:fixed;" id="guestReportSummary' + 'Table">';
                guestReportSummaryTable += '<thead>';
                guestReportSummaryTable += '<tr>';
//                userReportSummaryTable += '<th>First Name</th>';
//                userReportSummaryTable += '<th>Last Name</th>';
//                userReportSummaryTable += '<th>Email</th>';
                guestReportSummaryTable += '<th>Date</th>';
                guestReportSummaryTable += '<th>Office Attended</th>';
                guestReportSummaryTable += '<th>Departed Early</th>';
                guestReportSummaryTable += '<th>Visiting Host</th>';
                guestReportSummaryTable += '<th>Notes</th>';
                guestReportSummaryTable += '</tr>';
                guestReportSummaryTable += '</thead>';
                guestReportSummaryTable += '<tbody class="guestReportSummaryRow" id=' + i + '></tbody>';
                guestReportSummaryTable += '</table>';
                guestReportSummaryTable += '</div>';

                guestReportSummaryTableDiv.append(guestReportSummaryTable);
      
            $.each(data, function (i) {
                console.log(data);

                console.log(data[i].location.cityName);
                attendanceLocationName = data[i].location.cityName;
                attendanceId = data[i].location.locationId;
                departedEarly = data[i].departedEarly;
                
                var departedEarlyDisplay;
                if (departedEarly === true) { 
                   departedEarlyDisplay = 'Yes';  
                }else if(departedEarly === false){
                    departedEarlyDisplay = 'No';
                }

                var dateStringId = data[i].attendanceDate;
                fullDate2 = data[i].attendanceDate.toString();
                year = fullDate2.substring(0, 4).trim();
                var monthDate = fullDate2.substring(5);
                month = monthDate.substring(0, 2).trim();
                day = fullDate2.substring(8);
                dateStringDisplay = month + '/' + day + '/' + year;

                var row = '<tr>';
                row = '<tr>';
                row += "<td> <button class='report-date-submit' id='" + dateStringId + "'>" + month + '/' + day + '/' + year + "</button> </td>";
                row += '<td>' + attendanceLocationName + '</td>';
                row += '<td>' + departedEarlyDisplay + '</td>';
                row += '<td>' + visitingHost + '</td>';
                row += '<td>' + miscInfo + '</td>';
                row += '</tr>';

                $('.guestReportSummaryRow').append(row);
            });
            

            } else {
                console.log(data[0].user.role.roleId);
                
                
                userName = data[0].user.firstName + ' ' + data[0].user.lastName;
                firstName = data[0].user.firstName;
                lastName = data[0].user.lastName;
                email = data[0].user.email;
                var visitingHost = data[0].visitingHost;
                var miscInfo = data[0].miscInfo;
                
                //$("#report-attendance-table").show();
                //console.log('The request for user ' + userId + ' attendance within the last 30 days was successful.');
                //$("#attendance-message").empty();
                $('#report-attendance-dates').empty();
                $("#isAttendingTable").hide();
                $("#isAttendingRow").empty();

                var userReportSummaryTableDiv = $("#userReportSummaryTableDiv");

                //var attendanceDateDiv = $('#report-attendance-dates');
                var userReportSummaryTable;
               // var i = 0;
                $("#attendance-message").html("Over the past 30 days, the selected employee was in the office on the following dates.<br>Click a date to view all employees and guests in the attended office.");

                var userReportSummaryTable = '<h5 class="table-header" id="userReportSummaryTableHeader">' + 'Office Attendance for ' + userName + '</h5>';
                userReportSummaryTable += '<div class="col-12">';
                userReportSummaryTable += '<table class="table table-striped" style="table-layout:fixed;" id="userReportSummary' + 'Table">';
                userReportSummaryTable += '<thead>';
                userReportSummaryTable += '<tr>';
                userReportSummaryTable += '<th>Date</th>';
                userReportSummaryTable += '<th>Office Attended</th>';
                userReportSummaryTable += '<th>Departed Early</th>';
//                userReportSummaryTable += '<th>Visiting Host</th>';
//                userReportSummaryTable += '<th>Notes</th>';
                userReportSummaryTable += '</tr>';
                userReportSummaryTable += '</thead>';
                userReportSummaryTable += '<tbody class="userReportSummaryRow" id=' + i + '></tbody>';
                userReportSummaryTable += '</table>';
                userReportSummaryTable += '</div>';

                userReportSummaryTableDiv.append(userReportSummaryTable);

            $.each(data, function (i) {
                console.log(data);

                console.log(data[i].location.cityName);
                attendanceLocationName = data[i].location.cityName;
                attendanceId = data[i].location.locationId;
                departedEarly = data[i].departedEarly;
                
                var departedEarlyDisplay;
                if (departedEarly === true) { 
                   departedEarlyDisplay = 'Yes';  
                }else if(departedEarly === false){
                    departedEarlyDisplay = 'No';
                }
               

                var dateStringId = data[i].attendanceDate;
                fullDate2 = data[i].attendanceDate.toString();
                year = fullDate2.substring(0, 4).trim();
                var monthDate = fullDate2.substring(5);
                month = monthDate.substring(0, 2).trim();
                day = fullDate2.substring(8);
                dateStringDisplay = month + '/' + day + '/' + year;

                var row = '<tr>';
                row = '<tr>';
                row += "<td> <button class='report-date-submit' id='" + dateStringId + "'>" + month + '/' + day + '/' + year + "</button> </td>";
                row += '<td>' + attendanceLocationName + '</td>';
                row += '<td>' + departedEarlyDisplay + '</td>';
//                row += '<td>' + visitingHost + '</td>';
//                row += '<td>' + miscInfo + '</td>';
                row += '</tr>';

                $('.userReportSummaryRow').append(row);
            });
 
            }

            }
            
            $(".report-date-submit").on("click", function () {
                var btnId = this.id;
                btnIdString = btnId.toString();
                //console.log('clicked on ' + btnId + ' -- ' + btnIdString);
                getEmployeesByDate(locationId);
                console.log(locationId);
                $("#attendance-message").empty();
            });
        },

        error: function (http) {
            $('#reportErrorMessages')
                    .append($('<li>')
                            .attr({class: 'list-group-item list-group-item-danger'})
                            .text('An error has occurred.'));
            setTimeout(function () {
                $('#reportErrorMessages').fadeOut('fast');
            }, 2000);
            console.log(http + 'An error resulted when attempting to retrieve user ' + userId + ' attendance within the last 30 days.');
        }
    });
}
     
    function updateInputName(userId){
        $("#reportSummaryTableDiv").empty();
        $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/user/' + userId,
        headers: {
            "email": adminEmail,
            "password": adminPassword
            },
        success: function(data, status) {
               $("#myInput").val('');
               $("#attendanceNameTableHeader").show();
               $("#attendanceNameTableHeader").html(data.firstName + ' ' + data.lastName);
            },
            error: function (http) {
                $('#reportErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
                 setTimeout(function() {
                    $('#reportErrorMessages').fadeOut('fast');
                }, 2000);
                 console.log(http + 'An error resulted when attempting to retrieve user ' + userId + ' user name.');
             }
        });
    }


     //get value of date picker and send to ajax call
    $("#report-date-btn").on("click", function() {
        $("#attendanceNameTableHeader").empty();
        $('#userReportSummaryTableDiv').empty();
        $('#userReportSummaryTableDiv').empty();
        $('#reportAttendanceTableDiv').empty();
        $('#reportSummaryTableDiv').empty();
        $('#dateSummaryTableDiv').empty();
        $('#guestReportSummaryTableDiv').empty();
        selectedLocationId = $('#reportLocationOption').val();
        cityName = getAllLocations(selectedLocationId);
        //console.log(cityName);
        //console.log(allLocations);
        $("#myList").hide();
        $("#attendance-message").empty();
        var dateInput = $("#attendanceDate").val();
        var dateInputTwo = $("#attendanceDateTwo").val();
        btnIdString = dateInput.toString();
        btnIdStringTwo = dateInputTwo.toString();
        
        console.log('start date clicked on: ' + btnIdString);
        console.log('end date clicked on: ' + btnIdStringTwo);
       
        if(btnIdStringTwo !== null && btnIdStringTwo !== '') {
            getEmployeesByDateRange(locationId);

        } else {
            getEmployeesByDate(locationId);
        
        }

    });


    $('#myInput').click(function (e) {
        clearReport(); 
    });
        
        
      function clearReport() {
        $("input[type=date]").val(''); //reset date picker
        $('#noAttendees').hide(); //hide no attendees on date error 
        $('#userReportSummaryTableDiv').empty();
        $('#userReportSummaryTableDiv').empty();
        $('#reportAttendanceTableDiv').empty();
        $('#reportSummaryTableDiv').empty();
        $('#dateSummaryTableDiv').empty();
        $("#attendance-message").empty();
        $("#attendanceNameTableHeader").empty();
        $('#guestReportSummaryTableDiv').empty();
        //$("#attendanceTableHeader").hide();               
        //$("#attendanceNameTableHeader").empty();
       //$("#attendanceNameTableHeader").hide();

    };

//var attendanceLocation;
var attendanceLocationId;

    function getEmployeesByDate(){
        $("#reportAttendanceTableDiv").empty();
        $("#reportSummaryTableDiv").empty();
        $("#attendanceNameTableHeader").html(specifiedDate);
        $("#attendance-message").empty();
       // $('#guestReportSummaryTableDiv').empty();
       // $(".report-date-submit").hide();
       // $('#datePicker').val(new Date().toDateInputValue());
        console.log('date in get empl function: ' + btnIdString);
        var specifiedDate = btnIdString;
        //userId = selectedUserId;
        console.log(selectedUserId);
        $('#isAttendingRows').empty();
        
        var reportAttendanceRow = $('.reportAttendanceRow');
        
        $.ajax({
            type: 'GET',
             url: 'http://localhost:8080/api/admin/attendanceReport/' + selectedUserId + '/' + specifiedDate,
             
             headers: {
                "email": adminEmail,
                "password": adminPassword
             },

            success: function (response) {
                console.log('The request for the attendance report was successful.' + specifiedDate);
                //console.log(response);
                var reportAttendanceTableDiv = $("#reportAttendanceTableDiv");
                var attendanceLocation = response[0].location.cityName;
                
                if (response.length > 0) {
               // if (response.)
                $("#attendance-message").html("Over the past 30 days, the selected employee was in the office on the following dates.<br>Click a date to view all employees in the attended office.");
                
                var reportAttendanceTable = '<h5 class="table-header" id="userReportSummaryTableHeader">' + 'Office Attendance for ' + attendanceLocation + '</h5>';
                reportAttendanceTable += '<div class="col-12">';
                reportAttendanceTable += '<table class="table table-striped" style="table-layout:fixed;" id="userReportSummary' + 'Table">';
                reportAttendanceTable += '<thead>';
                reportAttendanceTable += '<tr>';
                reportAttendanceTable += '<th>First Name</th>';
                reportAttendanceTable += '<th>Last Name</th>';
                reportAttendanceTable += '<th>Email</th>';
                reportAttendanceTable += '<th>Office Attended</th>';
                reportAttendanceTable += '<th>Departed Early</th>';
                reportAttendanceTable += '<th>Home Office</th>';
                reportAttendanceTable += '<th>Date</th>';
                reportAttendanceTable += '</tr>';
                reportAttendanceTable += '</thead>';
                reportAttendanceTable += '<tbody id="reportAttendanceRow"></tbody>';
                reportAttendanceTable += '</table>';
                reportAttendanceTable += '</div>';
               
                reportAttendanceTableDiv.append(reportAttendanceTable);
            
            //var i = 0;
            //if (response[i].isAttending === true) {
            $.each(response, function (i, user) {
                console.log(user);
                firstName = user.user.firstName;
                lastName = user.user.lastName;
                userName = user.user.firstName + ' ' + user.user.lastName;
                email = user.user.email;
                attendanceLocation = user.location.cityName;
                attendanceLocationId = user.location.locationId;
                attendanceDate = user.attendanceDate;
                homeLocation = user.user.location.cityName;

                departedEarly = user.departedEarly;
                console.log(departedEarly);
                
                var departedEarlyDisplay;
                if (departedEarly === true) { 
                   departedEarlyDisplay = 'Yes';  
                }else if(departedEarly === false){
                    departedEarlyDisplay = 'No';
                }
                
               
               // if (response[i].isAttending === true) {
                    var row = '<tr>';
                    row += '<td>' + firstName + '</td>';
                    row += '<td>' + lastName + '</td>';
                    row += '<td>' + email + '</td>';
                    row += '<td>' + attendanceLocation + '</td>';
                    row += '<td>' + departedEarlyDisplay + '</td>';
                    row += '<td>' + homeLocation + '</td>';
                    row += '<td>' + attendanceDate + '</td>';
                    row += '</tr>';
                
                  $('#reportAttendanceRow').append(row);

                });
                
            //}
                } else if (response.length <= 0) { 
                    console.log("There are no attendance records on the date selected.");
                    $("#attendanceNameTableHeader").show();
                    $("#attendanceNameTableHeader").html('<br>' + specifiedDate);
                    $("#attendanceTableHeader").empty();
                    $("#attendanceTableHeader").hide();
                    $("#attendance-message").show();
                    $("#attendance-message").text("There are no attendance records on the date selected.");
                    $("#isAttendingTable").hide();

                };

            },
             error: function (http) {
                $('#reportErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
                setTimeout(function() {
                    $('#reportErrorMessages').fadeOut('fast');
                }, 2000);
                 console.log(http + 'An error resulted when attempting to retrieve the attendance report.' + specifiedDate);
            }
         });
     
    };


function getEmployeesByDateRange(attendanceLocationId) {
    $('#dateSummaryTableDiv').empty();
    $("#reportSummaryTableDiv").empty();
    $("#reportAttendanceTableDiv").empty();
    $("#attendance-message").empty();
    locationId = attendanceLocationId;
    console.log(attendanceLocationId);

    var startDate = btnIdString;
    var endDate = btnIdStringTwo;
    console.log(btnIdStringTwo);
    //$(".report-date-submit").hide();
    console.log('date in get empl function: ' + btnIdString);
    $("#noAttendees").hide();
    var specifiedDate = btnIdString;

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/attendanceDuringRangeSummary/' + attendanceLocationId + '/' + startDate + '/' + endDate,

        headers: {
            "email": adminEmail,
            "password": adminPassword
        },

        success: function (response) {
            console.log('The request for the attendance report was successful.' + specifiedDate);
            console.log(response);

            if (response.length > 0) {

                //console.log("There are no attendance records for the date range selected.");
//                    $("#attendanceNameTableHeader").show();
//                    $("#attendanceNameTableHeader").html(startDate + ' through ' + endDate);
//                    $("#attendanceTableHeader").empty();
//                    $("#attendanceTableHeader").hide();
//                    $("#attendance-message").show();
//                    $("#attendance-message").text("There are no attendance records on the date selected.");
//                    $("#isAttendingTable").hide();
                // var dateAttendanceTableDiv;
                var dateAttendanceTable = '<h5 class="table-header" id="dateAttendanceSummaryTableHeader"> Summary of ' + locationName + ' Office Attendance<br>' + startDate + ' through ' + endDate + '</h5>';
                dateAttendanceTable += '<div class="col-12">';
                dateAttendanceTable += '<table class="table table-striped" style="table-layout:fixed;" id="dateAttendanceSummaryTable">';
                dateAttendanceTable += '<thead>';
                dateAttendanceTable += '<tr>';
                dateAttendanceTable += '<th>First Name</th>';
                dateAttendanceTable += '<th>Last Name</th>';
                dateAttendanceTable += '<th>Email</th>';
                dateAttendanceTable += '<th>Office Attended</th>';
                dateAttendanceTable += '<th>Home Office</th>';
                dateAttendanceTable += '</tr>';
                dateAttendanceTable += '</thead>';
                dateAttendanceTable += '<tbody id="dateAttendanceRowTable"></tbody>';
                dateAttendanceTable += '</table>';
                dateAttendanceTable += '<hr id="dateAttendanceTable">';
                dateAttendanceTable += '</div>';

                $('#dateSummaryTableDiv').append(dateAttendanceTable);

                    $.each(response, function (i, data) {
                        var firstName = response[i].firstName;
                        var lastName = response[i].lastName;
                        var userEmail = response[i].email;
                        var userLocation = response[i].location.cityName;

                        var dateSummaryRow = '<tr>';
                        dateSummaryRow += '<td>' + firstName + '</td>';
                        dateSummaryRow += '<td>' + lastName + '</td>';
                        dateSummaryRow += '<td>' + userEmail + '</td>';
                        dateSummaryRow += '<td>' + locationName + '</td>';
                        dateSummaryRow += '<td>' + userLocation + '</td>';
                        dateSummaryRow += '</tr>';

                        $('#dateAttendanceRowTable').append(dateSummaryRow);

                    });
                }

                if (response.length <= 0) {
                    $("#attendance-message").show();
                    $("#attendance-message").text("There are no attendance records on the date selected.");
                    //isAttendingRows.append("There are no attendance records for the date selected");
                }

        },
        error: function (http) {
            $('#reportErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
           setTimeout(function() {
                $('#reportErrorMessages').fadeOut('fast');
            }, 2000);
            console.log(http + 'An error resulted when attempting to retrieve a user attendance summary for the specified range.');
        }
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/attendanceDuringRange/' + locationId + '/' + startDate + '/' + endDate,
        headers: {
            "email": adminEmail,
            "password": adminPassword
        },
        success: function (response) {
            console.log(response);
            console.log('The request for the attendance summary report over date range was successful.' + startDate + ' -' + endDate);
            var reportSummaryRow = $("#date");
            var reportSummaryTableHeader = $("#reportSummaryTableHeader");
            var reportSummaryTableDiv = $("#reportSummaryTableDiv");
            var firstName;
            var lastName;
            var email;
            var location;

            $.each(response, function (date, data) {
                var reportTitle = date;
                //console.log(reportDate);
                var reportSummaryTable = '<h5 class="table-header" id="reportSummaryTableHeader">'+ locationName +' Office Attendance for '+ reportTitle+'</h5>';
                reportSummaryTable += '<div class="float-right"><button class="btn btn-primary export">Export To CSV</button></div>';
                reportSummaryTable += '<div class="col-12">';
                reportSummaryTable += '<table class="table table-striped" style="table-layout:fixed;" id="reportSummary' + date + 'Table">';
                reportSummaryTable += '<thead>';
                reportSummaryTable += '<tr>';
                reportSummaryTable += '<th>First Name</th>';
                reportSummaryTable += '<th>Last Name</th>';
                reportSummaryTable += '<th>Email</th>';
                reportSummaryTable += '<th>Office Attended</th>';
                reportSummaryTable += '<th>Home Office</th>';
                reportSummaryTable += '<th>Date</th>';
                reportSummaryTable += '</tr>';
                reportSummaryTable += '</thead>';
                reportSummaryTable += '<tbody class="reportSummaryRow" id=' + date + '></tbody>';
                reportSummaryTable += '</table>';
                reportSummaryTable += '</div>';

                reportSummaryTableDiv.append(reportSummaryTable);
                rowsPerDay();

                var row;
                function rowsPerDay() {
                    $.each(data, function (i, user) {
                        console.log(data);
                        console.log(user);
                        var userObj = user;
                        firstName = userObj.firstName;
                        lastName = userObj.lastName;
                        email = userObj.email;
                        location = userObj.location.cityName;

                        row = '<tr>';
                        row = '<tr>';
                        row += '<td>' + firstName + '</td>';
                        row += '<td>' + lastName + '</td>';
                        row += '<td>' + email + '</td>';
                        row += '<td>' + locationName + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + date + '</td>';
//                        row += '<td>' + '' + '</td>';
                        row += '</tr>';
                        $('#reportSummary' + date + 'Table').append(row);
                    });

                };
                
            });
        },
             error: function (http) {
                $('#reportErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('An error has occurred.'));
                 console.log(http + 'An error resulted when attempting to retrieve attendance over the specified range.');
             }
         });

     };
    
   
  //export to CSV
 $("#export").click(function() {
  var titles = [];
  var data = [];

  $('.dataTable th').each(function() {
    titles.push($(this).text());
  });

  $('.dataTable td').each(function() {
    data.push($(this).text());
  });
  
// Convert data to CSV string
  var CSVString = prepCSVRow(titles, titles.length, '');
  CSVString = prepCSVRow(data, titles.length, CSVString);

var reportTitle = $("#attendanceTableHeader").text();
console.log(reportTitle);
//Make CSV downloadable
  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff", CSVString]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = reportTitle + ".csv";

// download CSV
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});

function prepCSVRow(arr, columnCount, initial) {
  var row = ''; // this will hold data
  var delimeter = ';'; // data slice separator, in excel it's `;`, in usual CSv it's `,`
  var newLine = '\r\n'; // newline separator for CSV row

  function splitArray(_arr, _count) {
    var splitted = [];
    var result = [];
    _arr.forEach(function(item, idx) {
      if ((idx + 1) % _count === 0) {
        splitted.push(item);
        result.push(splitted);
        splitted = [];
      } else {
        splitted.push(item);
      }
    });
    return result;
  }
  var plainArr = splitArray(arr, columnCount);
  // it converts `['a', 'b', 'c']` to `a,b,c` string
  plainArr.forEach(function(arrItem) {
    arrItem.forEach(function(item, idx) {
      row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
    });
    row += newLine;
  });
  return initial + row;
}






    //     var locationId = 1;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/users/' + locationId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for users by locationId was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve users by locationId.');
    //         }
    //     });

    // });


    // // @GetMapping("/user/{id}")
    // // public ResponseEntity<User> getUserById
    // $('#getUser7').click(function (event) {

    //     var userId = 7;

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/user/' + userId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The request for users by locationId was successful.');
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve users by locationId.');
    //         }
    //     });

    // });
    
    
    // // @PostMapping("/deactivateUser/{id}")
    // // public ResponseEntity<User> deactivateUser

    // $('#makeUser349Inactive').click(function(event) {

    //     var userId = 349;

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/deactivateUser/' + userId,
    //         headers: {
    //             'email': 'twyborny@genesis10.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The request to make the user inactive was successful.');
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to make the user inactive.');
    //         }
    //     });
    // });


    // // @PostMapping("/reactivateUser/{id}")
    // // public ResponseEntity<User> reactivateUser

    // $('#makeUser349Active').click(function(event) {

    //     var userId = 349;

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/reactivateUser/' + userId,
    //         headers: {
    //             'email': 'twyborny@genesis10.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The request to reactive the user was successful.');
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to reactivate the user.');
    //         }
    //     });
    // });


    // // @GetMapping("/attendanceDuringRange/{id}/{startDate}/{endDate}")
    // // public ResponseEntity<TreeMap<LocalDate, List<User>>> traceContact

    // $('#attendanceDuringRangeMay21ToJun3InMinne').click(function (event) {

    //     var locationId = 5;
    //     var startDate = "2020-05-21";
    //     var endDate = "2020-06-03";

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/attendanceDuringRange/' + locationId + '/' + startDate + '/' + endDate,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log(data);
    //             console.log('The request for attendance over the specified range was successful.');
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve attendance over the specified range.');
    //         }
    //     });

    // });


    // // @CrossOrigin(origins = "https://044db60.netsolhost.com")
    // // @GetMapping("/attendanceDuringRangeSummary/{id}/{startDate}/{endDate}")    

//    $('#attendanceDuringRangeSummaryMay21ToJun3InMinne').click(function (event) {
//
//         var locationId = 5;
//         var startDate = "2020-05-21";
//         var endDate = "2020-06-03";
//
//         $.ajax({
//             type: 'GET',
//             url: 'http://localhost:8080/api/admin/attendanceDuringRangeSummary/' + locationId + '/' + startDate + '/' + endDate,
//             headers: {
//                 'email': 'user@user.com',
//                 'password': 'password'
//             },
//             success: function (data) {
//                 console.log(data);
//                 console.log('The request for a user attendance summary for the specified range was successful.');
//             },
//             error: function (http) {
//                 console.log(http);
//                 console.log('An error resulted when attempting to retrieve a user attendance summary for the specified range.');
//             }
//         });
//
//    });


    // // @CrossOrigin(origins = "https://044db60.netsolhost.com")
    // // @GetMapping("/flaggedGlobal/{id}")


    // $('#getFlaggedUsersGlobal').click(function (event) {
    

    //     $.ajax({
    //         type: 'GET',
    //         url: 'http://localhost:8080/api/admin/flaggedGlobal',
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function (data) {
    //             console.log('The request for flagged personnel was successful.');
    //             $.each(data, function(index, datum) {
    //                 console.log(datum);
    //             });
    //         },
    //         error: function (http) {
    //             console.log(http);
    //             console.log('An error resulted when attempting to retrieve flagged personnel.');
    //         }
    //     });
    // })


    // // @CrossOrigin(origins = "https://044db60.netsolhost.com")
    // // @PostMapping("/departedEarly/{id}")

    // $('#markUser348AsDepartedEarly').click(function(event) {

    //     var userId = 348;

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/departedEarly/' + userId,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function(data) {
    //             console.log(data)
    //         },
    //         error: function(http) {
    //             console.log(http)
    //         }
    //     })

    // });


    // // @CrossOrigin(origins = "https://044db60.netsolhost.com")
    // // @PosttMapping("/addLocation")

    // $('#addNewLocation').click(function(event) {

    //     var cityNameField = "New location"
    //     var maxOccupancyField = "22"
    //     var distributionEmailField = "new@location.com"

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/addLocation',
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         contentType: "application/json;charset=UTF-8",
    //         data: JSON.stringify({
    //             "cityName": cityNameField,
    //             "maxOccupancy": maxOccupancyField,
    //             "distributionEmail": distributionEmailField
    //         }),
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function(http) {
    //             console.log(http);
    //         }
    //     });

    // });


    // // @CrossOrigin(origins = "https://044db60.netsolhost.com")
    // // @PostMapping("/location/{id}/{num}/{dibEmail}")
    
    // $('#editLocation').click(function(event) {

    //     var locationId = "6"
    //     var maxOccupancyField = "26"
    //     var distributionEmailField = "email@changedagain.com"

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:8080/api/admin/location/' + locationId + '/' + maxOccupancyField + '/' + distributionEmailField,
    //         headers: {
    //             'email': 'user@user.com',
    //             'password': 'password'
    //         },
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function(http) {
    //             console.log(http);
    //         }
    //     });

    // });


    // // ********** Preparing Ajax calls End