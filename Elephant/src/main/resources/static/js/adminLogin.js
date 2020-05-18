$(document).ready(function () {
    $("#loginNav").show();
    $("#adminLoginDiv").show();
    $("#loginErr").hide();
    $("#navBarDiv").hide();
    $("#dashboardDiv").hide();
    $("#allEmployeesDiv").hide();
    $("#createAccountDiv").hide();
    $("#createLocationDiv").hide();
    $("#employeeInfoDiv").hide();
    $("#healthSurveyDiv").hide();
    $("#scheduleArrivalDiv").hide();
    $("#deleteEmployeeDiv").hide();

    $("#submitLoginButton").click(function (e) {
        e.preventDefault();
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
                if (response.role.roleId === 2) {
                    window.location.replace('/index.html');
                } else if (response.role.roleId === 1) {
                    $("#adminLoginDiv").hide();
                    $("#loginNav").hide();
                    $("#navBarDiv").show();
                    $("#dashboardDiv").show();
                    
$("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');

         var locationId = 1;

         $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/noAnswers/' + locationId,
             headers: {
                 'email': 'user@user.com',
                 'password': 'password'
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
                row += '<td><button class="editNoResEmployeeBtn btn btn-info">Edit</button></td>';
                row += '</tr>';
                noResponseRows.append(row);
            });
            
            $('.editNoResEmployeeBtn').click(function (event) {
                $("#loginNav").hide();
                $("#adminLoginDiv").hide();
                $("#loginErr").hide();
                $("#navBarDiv").show();
                $("#dashboardDiv").hide();
                $("#allEmployeesDiv").hide();
                $("#createAccountDiv").hide();
                $("#createLocationDiv").hide();
                $("#employeeInfoDiv").show();
                $("#healthSurveyDiv").hide();
                $("#scheduleArrivalDiv").hide();
                $("#deleteEmployeeDiv").hide();
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
                 'email': 'user@user.com',
                 'password': 'password'
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
                row += '<td><button class="editAuthBtn btn btn-info">Edit</button></td>';
                row += '</tr>';
                authPendRows.append(row);
            });
            
            $('.editAuthBtn').click(function (event) {
                $("#loginNav").hide();
                $("#adminLoginDiv").hide();
                $("#loginErr").hide();
                $("#navBarDiv").show();
                $("#dashboardDiv").hide();
                $("#allEmployeesDiv").hide();
                $("#createAccountDiv").hide();
                $("#createLocationDiv").hide();
                $("#employeeInfoDiv").show();
                $("#healthSurveyDiv").hide();
                $("#scheduleArrivalDiv").hide();
                $("#deleteEmployeeDiv").hide();
            });
             },
             error: function() {
            $('#authErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }
         });

   
    
                }
 
            },
            error: function (err) {
                console.log(err);
                $('#loginErr').show();
                $('#loginErr').text("Either your username or password is incorrect. Please contact your branch administrator if you need assistance.");
                clearLogin();
                return false;
            }

        });
        return false;
    });
    
    $('#takeSurveyBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").show();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
        
        
    });
    
    $('#dashboardBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").show();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
        
        $("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');

         var locationId = 1;

         $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/noAnswers/' + locationId,
             headers: {
                 'email': 'user@user.com',
                 'password': 'password'
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
                row += '<td><button class="editNoResEmployeeBtn btn btn-info">Edit</button></td>';
                row += '</tr>';
                noResponseRows.append(row);
            });
            
            $('.editNoResEmployeeBtn').click(function (event) {
                $("#loginNav").hide();
                $("#adminLoginDiv").hide();
                $("#loginErr").hide();
                $("#navBarDiv").show();
                $("#dashboardDiv").hide();
                $("#allEmployeesDiv").hide();
                $("#createAccountDiv").hide();
                $("#createLocationDiv").hide();
                $("#employeeInfoDiv").show();
                $("#healthSurveyDiv").hide();
                $("#scheduleArrivalDiv").hide();
                $("#deleteEmployeeDiv").hide();
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
                 'email': 'user@user.com',
                 'password': 'password'
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
                row += '<td><button class="editAuthBtn btn btn-info">Edit</button></td>';
                row += '</tr>';
                authPendRows.append(row);
            });
            
            $('.editAuthBtn').click(function (event) {
                $("#loginNav").hide();
                $("#adminLoginDiv").hide();
                $("#loginErr").hide();
                $("#navBarDiv").show();
                $("#dashboardDiv").hide();
                $("#allEmployeesDiv").hide();
                $("#createAccountDiv").hide();
                $("#createLocationDiv").hide();
                $("#employeeInfoDiv").show();
                $("#healthSurveyDiv").hide();
                $("#scheduleArrivalDiv").hide();
                $("#deleteEmployeeDiv").hide();
            });
             },
             error: function() {
            $('#authErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }
         });

   
         
         
         
         
         
         
         
         
     

         
    

    });
    
    $('#logoBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").show();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('#employeesBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
        
        $("#allEmployeeErr").hide();

        $('#contentRows').empty();

    var contentRows = $('#contentRows');
    var password = $("#inputPassword").val();
    var email = $("#inputEmail").val();
    var locationId = 1;

    $.ajax({
        type: "GET",
//Need to change url so that it takes the admins location as the location id
        url: "http://localhost:8080/api/admin/users/" + locationId,
        headers: {
            "email": email,
            "password": password
        },
        success: function (data, status) {
            $.each(data, function (index, user) {
                var name = user.firstName + ' ' + user.lastName;
                var email = user.email;
                var location = user.location.cityName;
//Need to change completed survey
                var surveyStatus = user.location.locationId;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + email + '</td>';
                row += '<td>' + location + '</td>';
                row += '<td>' + surveyStatus + '</td>';
                row += '<td><button class="editAllEmployeeBtn btn btn-info">Edit</button></td>';
                row += '<td><button class="deleteAllEmployeeBtn btn btn-danger">Delete</button></td>';
                row += '</tr>';
                contentRows.append(row);
            });
            $('.editAllEmployeeBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").show();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
      $('.deleteAllEmployeeBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").show();
    });
    
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }

    });
    });
    
    
    $('#createEmployeeBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").show();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('#addLocationBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").show();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('#logoutBtn').click(function (event) {
        $("#loginNav").show();
        $("#adminLoginDiv").show();
        $("#loginErr").hide();
        $("#navBarDiv").hide();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('#createAcctBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
        
        $("#allEmployeeErr").hide();

        $('#contentRows').empty();

    var contentRows = $('#contentRows');
    var password = $("#inputPassword").val();
    var email = $("#inputEmail").val();

    $.ajax({
        type: "GET",
//Need to change url so that it takes the admins location as the location id
        url: "http://localhost:8080/api/admin/users/1",
        headers: {
            "email": email,
            "password": password
        },
        success: function (data, status) {
            $.each(data, function (index, user) {
                var name = user.firstName + ' ' + user.lastName;
                var email = user.email;
                var location = user.location.cityName;
//Need to change completed survey
                var surveyStatus = user.location.locationId;

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + email + '</td>';
                row += '<td>' + location + '</td>';
                row += '<td>' + surveyStatus + '</td>';
                row += '<td><a class="btn btn-info" href="employeeInfo.html">Edit</a></td>';
                row += '<td><a class="btn btn-danger" href="#">Delete</a></td>';
                row += '</tr>';
                contentRows.append(row);
            });
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }

    });
    });
    
    $('#submitEmployeeInfoBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('#deleteEmployeeInfoBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").show();
    });
    
    $('#createLocationSubmitBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#createAccountDiv").show();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('.deleteEmployeeBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
    $('#cancelDeleteBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#scheduleArrivalDiv").hide();
        $("#deleteEmployeeDiv").hide();
    });
    
  
    
    
    

});

function clearLogin() {
    $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
    });
};

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
         
$("#surveySubmit").on("click", function (e) {
    e.preventDefault();
    $("#survey-container").hide();
    //var password = 
    //var email = 

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
            url: "http://localhost:8080/api/users/login",
            contentType: "application/json;charset=UTF-8",
           //$("authorized").text("You're approved to come to the office. Next, select a time.");
//            headers: {
//                "email": email,
//                "password": password
//            },
    
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

    //     var locationId = 1;

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


    // // @GetMapping("/users/{id}")
    // // public ResponseEntity<List<User>> getUsers
    // $('#getUsers').click(function (event) {

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


    // // ********** Preparing Ajax calls End