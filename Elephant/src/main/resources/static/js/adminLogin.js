
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
                row += '<td><a class="btn btn-info" id="editAllEmployeeBtn">Edit</a></td>';
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
    
    $('#editAllEmployeeBtn').click(function (event) {
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
