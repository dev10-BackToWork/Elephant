$(document).ready(function () {

    var adminLocation;
    var allLocations;

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/locations',
        headers: {
            'email': 'user@user.com',
            'password': 'password'
        },
        success: function (data) {
            allLocations = data;
            console.log(allLocations);
        },
        error: function (http) {
            console.log(http);
            console.log('An error resulted when attempting to retrieve locations.');
        }
    });

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
    $("#successfulDeleteDiv").hide();

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
                    adminLocation = response.location.locationId;
                    $("#adminLoginDiv").hide();
                    $("#loginNav").hide();
                    $("#navBarDiv").show();
                    $("#dashboardDiv").show();
                    
                    $("#noResErrorMessages").hide();
                    $("#authErrorMessages").hide();
                    $("#arrivalErrorMessages").hide();
                    $("#departureErrorMessages").hide();

                    $('#noResponseRows').empty();
                    $('#authPendRows').empty();
                    $('#arrivalRows').empty();
                    $('#departureRows').empty();

                    var noResponseRows = $('#noResponseRows');
                    var authPendRows = $('#authPendRows');
                    var arrivalRows = $('#arrivalRows');
                    var departureRows = $('#departureRows');

                    var locationId = adminLocation;

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
                            $("#successfulDeleteDiv").hide();
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
                            $("#successfulDeleteDiv").hide();
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
                     url: 'http://localhost:8080/api/admin/arrivals/' + locationId,
                     headers: {
                         'email': 'user@user.com',
                         'password': 'password'
                     },
                     success: function (data) {
                         $.each(data, function(index, datum) {
                        var name = datum.user.firstName + ' ' + datum.user.lastName;
                        var location = datum.user.location.cityName;
                        var arrival = datum.timeSlot.startTime;
                        let str = arrival;
                        str = str.substring(0, str.length - 3);

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + str + '</td>';
                        row += '</tr>';
                        arrivalRows.append(row);
                         });
                     },
                     error: function() {
                    $('#arrivalErrorMessages')
                        .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('An error has occurred.'));
                }
            });
        
            $.ajax({
                 type: 'GET',
                     url: 'http://localhost:8080/api/admin/departures/' + locationId,
                     headers: {
                         'email': 'user@user.com',
                         'password': 'password'
                     },
                     success: function (data) {
                        $.each(data, function(index, datum) {
                        var name = datum.user.firstName + ' ' + datum.user.lastName;
                        var location = datum.user.location.cityName;
                        var departure = datum.timeSlot.startTime;
                        let str = departure;
                        str = str.substring(0, str.length - 3);

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td>' + str + '</td>';
                        row += '</tr>';
                        departureRows.append(row);
                         });
                     },
                     error: function() {
                    $('#departureErrorMessages')
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
        $("#successfulDeleteDiv").hide();
        
        
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
        $("#successfulDeleteDiv").hide();
        
        $("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        $("#arrivalErrorMessages").hide();
        $("#departureErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();
        $('#arrivalRows').empty();
        $('#departureRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');
        var arrivalRows = $('#arrivalRows');
        var departureRows = $('#departureRows');

        var locationId = adminLocation;

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
                $("#successfulDeleteDiv").hide();
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
                $("#successfulDeleteDiv").hide();
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
             url: 'http://localhost:8080/api/admin/arrivals/' + locationId,
             headers: {
                 'email': 'user@user.com',
                 'password': 'password'
             },
             success: function (data) {
                 $.each(data, function(index, datum) {
                var name = datum.user.firstName + ' ' + datum.user.lastName;
                var location = datum.user.location.cityName;
                var arrival = datum.timeSlot.startTime;
                let str = arrival;
                str = str.substring(0, str.length - 3);

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + location + '</td>';
                row += '<td>' + str + '</td>';
                row += '</tr>';
                arrivalRows.append(row);
                 });
             },
             error: function() {
            $('#arrivalErrorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('An error has occurred.'));
        }
        });
        
         $.ajax({
         type: 'GET',
             url: 'http://localhost:8080/api/admin/departures/' + locationId,
             headers: {
                 'email': 'user@user.com',
                 'password': 'password'
             },
             success: function (data) {
                $.each(data, function(index, datum) {
                var name = datum.user.firstName + ' ' + datum.user.lastName;
                var location = datum.user.location.cityName;
                var departure = datum.timeSlot.startTime;
                let str = departure;
                str = str.substring(0, str.length - 3);

                var row = '<tr>';
                row += '<td>' + name + '</td>';
                row += '<td>' + location + '</td>';
                row += '<td>' + str + '</td>';
                row += '</tr>';
                departureRows.append(row);
                 });
             },
             error: function() {
            $('#departureErrorMessages')
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
        $("#successfulDeleteDiv").hide();
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
        $("#successfulDeleteDiv").hide();
        
        $("#allEmployeeErr").hide();

        $('#contentRows').empty();

            var contentRows = $('#contentRows');
            var password = $("#inputPassword").val();
            var email = $("#inputEmail").val();
            var locationId = adminLocation;

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
                        var id = user.userId;

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + email + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td><button onclick="editSelectedUser(' + id + ')" btn btn-info">Edit</button></td>';
                        row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Delete</button></td>';
                        
                        row += '</tr>';
                        contentRows.append(row);
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
                $("#successfulDeleteDiv").hide();

                var userId = 7;

                    $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/user/' + userId,
                    headers: {
                         'email': 'user@user.com',
                         'password': 'password'
                     },
                    success: function(data, status) {
                          $('#delete-first-name').val(data.firstName);
                          $('#delete-last-name').val(data.lastName);
                          $('#delete-email').val(data.email);
                          $('#delete-password').val(data.passwords);
                          $('#delete-location').val(data.location.cityName);
                          $('#delete-role').val(data.role.name);
                      },
                      error: function() {
                        $('#deleteErrorMessages')
                           .append($('<li>')
                           .attr({class: 'list-group-item list-group-item-danger'})
                           .text('An error has occurred.  Please try again later.'));
                      }
                    });


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
        $("#successfulDeleteDiv").hide();

        $('#locationAddUser').empty();

        $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/locations',
                    headers: {
                        'email': 'user@user.com',
                        'password': 'password'
                    },
                    success: function (data) {
                        console.log(data);
                        console.log('The request for locations was successful.');
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
        $("#successfulDeleteDiv").hide();
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
        $("#successfulDeleteDiv").hide();
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
        $("#successfulDeleteDiv").hide();
        
        $("#allEmployeeErr").hide();

        $('#contentRows').empty();

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
        
        if(roleIdField == 1) {
            roleNameField = "ROLE_ADMIN";
        } else {
            roleNameField = "ROLE_USER";
        };

        var userObj = {
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

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/admin/newUser',
            headers: {
                'email': 'user@user.com',
                'password': 'password',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(userObj),
            success: function (data) {
                console.log(data);
                console.log('The request to generate ' + data.firstName + ' ' + data.lastName + ' was successful.');
            },
            error: function (http) {
                console.log(http);
                console.log('An error resulted when attempting to create a new user.');
            }
        });

        setTimeout(function() {}, 500);

        $.ajax({
            type: "GET",
    //Need to change url so that it takes the admins location as the location id
            url: "http://localhost:8080/api/admin/users/" + adminLocation,
            headers: {
                "email": email,
                "password": password
            },
            success: function (data, status) {
                $.each(data, function (index, user) {
                    var name = user.firstName + ' ' + user.lastName;
                    var email = user.email;
                    var location = user.location.cityName;

                    var row = '<tr>';
                    row += '<td>' + name + '</td>';
                    row += '<td>' + email + '</td>';
                    row += '<td>' + location + '</td>';
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

    $('#cancelAcctBtn').click(function (event) {
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
        $("#successfulDeleteDiv").hide();
        
        $("#allEmployeeErr").hide();
    })
    
    $('#submitEmployeeInfoBtn').click(function (event) {
        
        var userIdField = $('#edit-userId').val();
        var firstNameField = $('#edit-first-name').val();
        var lastNameField = $('#edit-last-name').val();
        var emailField = $('#edit-email').val();
        // var defaultPWField = 'password';
        var passwordsField = $('#edit-password').val();
        var locationIdField = $('#edit-location').val();
        var cityNameField = allLocations[locationIdField - 1].cityName;
        var timeIncrementField =  allLocations[locationIdField - 1].timeIncrement;
        var maxOccupancyField = allLocations[locationIdField - 1].maxOccupancy;
        var beginningTimeField = allLocations[locationIdField - 1].beginningTime;
        var endTimeField = allLocations[locationIdField - 1].endTime;
        var roleNameField = $('#edit-role').val();
        var roleIdField;

        if(roleNameField == "ROLE_ADMIN") {
            roleIdField = 1;
        } else {
            roleIdField = 2;
        }
        

        var userObj = {
            "userId": userIdField,
	        "firstName": firstNameField,
	        "lastName": lastNameField,
	        "email": emailField,
            // "defaultPW": defaultPWField,
            "passwords": passwordsField,
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
                'email': 'user@user.com',
                'password': 'password',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(userObj),
            success: function (data) {
                console.log(data);
                console.log('The user information associated with ' + data.firstName + ' ' + data.lastName + ' was updated.');
            },
            error: function (http) {
                console.log('An error resulted when attempting to edit the specified user.')
            }
        });
        
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
        $("#successfulDeleteDiv").hide();
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
        $("#successfulDeleteDiv").hide();
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
        $("#successfulDeleteDiv").hide();
    });
    
    $('.deleteEmployeeBtn').click(function (event) {
        
        
        
        var userId = 7;

         $.ajax({
             type: 'DELETE',
             url: 'http://localhost:8080/api/admin/user/' + userId,
             headers: {
                 'email': 'user@user.com',
                 'password': 'password'
             },
             success: function (data) {
                 console.log(data);
                 
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
            $("#successfulDeleteDiv").hide();

            $("#allEmployeeErr").hide();

            $('#contentRows').empty();

            var contentRows = $('#contentRows');
            var password = $("#inputPassword").val();
            var email = $("#inputEmail").val();
            var locationId = adminLocation;

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
                        var id = user.userId;

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + email + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td><button class="editAllEmployeeBtn btn btn-info">Edit</button></td>';
                        row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Delete</button></td>';
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
                    $("#successfulDeleteDiv").hide();

                    var userId = 7;

                    $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/user/' + userId,
                    headers: {
                         'email': 'user@user.com',
                         'password': 'password'
                     },
                    success: function(data, status) {
                          $('#edit-first-name').val(data.firstName);
                          $('#edit-last-name').val(data.lastName);
                          $('#edit-email').val(data.email);
                          $('#edit-password').val(data.passwords);
                          $('#edit-location').val(data.location.cityName);
                          $('#edit-role').val(data.role.name);
                      },
                      error: function() {
                        $('#editErrorMessages')
                           .append($('<li>')
                           .attr({class: 'list-group-item list-group-item-danger'})
                           .text('An error has occurred.  Please try again later.'));
                      }
                    });


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
                $("#successfulDeleteDiv").hide();


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
                $("#successfulDeleteDiv").hide();

                var userId = 7;

                    $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/user/' + userId,
                    headers: {
                         'email': 'user@user.com',
                         'password': 'password'
                     },
                    success: function(data, status) {
                          $('#delete-first-name').val(data.firstName);
                          $('#delete-last-name').val(data.lastName);
                          $('#delete-email').val(data.email);
                          $('#delete-password').val(data.passwords);
                          $('#delete-location').val(data.location.cityName);
                          $('#delete-role').val(data.role.name);
                      },
                      error: function() {
                        $('#deleteErrorMessages')
                           .append($('<li>')
                           .attr({class: 'list-group-item list-group-item-danger'})
                           .text('An error has occurred.'));
                      }
                    });


            });

                },
                error: function() {
                    $('#errorMessages')
                        .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('An error has occurred.'));
                }

            });     

                     },
                     error: function() {
                        $('#deleteErrorMessages')
                           .append($('<li>')
                           .attr({class: 'list-group-item list-group-item-danger'})
                           .text('An error has occurred.'));
                      }
                 });



        
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
        $("#successfulDeleteDiv").hide();
    });



















});

    function editSelectedUser(id) {
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
                    $("#successfulDeleteDiv").hide();

                    var userId = id;

                    $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/api/admin/user/' + userId,
                    headers: {
                         'email': 'user@user.com',
                         'password': 'password'
                     },
                    success: function(data, status) {
                          $('#edit-userId').val(id);
                          $('#edit-first-name').val(data.firstName);
                          $('#edit-last-name').val(data.lastName);
                          $('#edit-email').val(data.email);
                          $('#edit-password').val(data.passwords);
                          $('#edit-role').val(data.role.name);

                          populateEditLocationSelect(data.location.cityName);

                      },
                      error: function() {
                        $('#editErrorMessages')
                           .append($('<li>')
                           .attr({class: 'list-group-item list-group-item-danger'})
                           .text('An error has occurred.  Please try again later.'));
                      }
                    });
                    
    }

    function populateEditLocationSelect(currentCityName) {

        $('#edit-location').empty();

        var currentCityIndex;

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/admin/locations',
            headers: {
                'email': 'user@user.com',
                'password': 'password'
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

    }



    function deleteUser(userId) {  
        let isDelete = confirm("This user will be permanently deleted.");
        
    if (isDelete === true) {
        $.ajax({
             type: 'DELETE',
             url: 'http://localhost:8080/api/admin/user/' + userId,
             headers: {
                 'email': 'user@user.com',
                 'password': 'password'
             },
             success: function (data) {
                 console.log(data);
                 
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
            $("#deleteEmployeeDiv").hide();
            $("#successfulDeleteDiv").show();

//            $("#allEmployeeErr").hide();
//
//            $('#contentRows').empty();
//
//            var contentRows = $('#contentRows');
//            var password = $("#inputPassword").val();
//            var email = $("#inputEmail").val();
//            var locationId = adminLocation;
//
//            $.ajax({
//                type: "GET",
//        //Need to change url so that it takes the admins location as the location id
//                url: "http://localhost:8080/api/admin/users/" + locationId,
//                headers: {
//                    "email": email,
//                    "password": password
//                },
//                success: function (data, status) {
//                    $.each(data, function (index, user) {
//                        var name = user.firstName + ' ' + user.lastName;
//                        var email = user.email;
//                        var location = user.location.cityName;
//                        var id = user.userId;
//
//                        var row = '<tr>';
//                        row += '<td>' + name + '</td>';
//                        row += '<td>' + email + '</td>';
//                        row += '<td>' + location + '</td>';
//                        row += '<td><button class="editAllEmployeeBtn btn btn-info">Edit</button></td>';
//                        row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Delete</button></td>';
//                        row += '</tr>';
//                        contentRows.append(row);
//                    });
//                $('.editAllEmployeeBtn').click(function (event) {
//                    $("#loginNav").hide();
//                    $("#adminLoginDiv").hide();
//                    $("#loginErr").hide();
//                    $("#navBarDiv").show();
//                    $("#dashboardDiv").hide();
//                    $("#allEmployeesDiv").hide();
//                    $("#createAccountDiv").hide();
//                    $("#createLocationDiv").hide();
//                    $("#employeeInfoDiv").show();
//                    $("#healthSurveyDiv").hide();
//                    $("#scheduleArrivalDiv").hide();
//                    $("#deleteEmployeeDiv").hide();
//
//                    var userId = 7;
//
//                    $.ajax({
//                    type: 'GET',
//                    url: 'http://localhost:8080/api/admin/user/' + userId,
//                    headers: {
//                         'email': 'user@user.com',
//                         'password': 'password'
//                     },
//                    success: function(data, status) {
//                          $('#edit-first-name').val(data.firstName);
//                          $('#edit-last-name').val(data.lastName);
//                          $('#edit-email').val(data.email);
//                          $('#edit-password').val(data.passwords);
//                          $('#edit-location').val(data.location.cityName);
//                          $('#edit-role').val(data.role.name);
//                      },
//                      error: function() {
//                        $('#editErrorMessages')
//                           .append($('<li>')
//                           .attr({class: 'list-group-item list-group-item-danger'})
//                           .text('An error has occurred.  Please try again later.'));
//                      }
//                    });
//
//
//                 $("#loginNav").hide();
//                $("#adminLoginDiv").hide();
//                $("#loginErr").hide();
//                $("#navBarDiv").show();
//                $("#dashboardDiv").hide();
//                $("#allEmployeesDiv").show();
//                $("#createAccountDiv").hide();
//                $("#createLocationDiv").hide();
//                $("#employeeInfoDiv").hide();
//                $("#healthSurveyDiv").hide();
//                $("#scheduleArrivalDiv").hide();
//                $("#deleteEmployeeDiv").hide();
//
//
//                });
//
//              $('.deleteAllEmployeeBtn').click(function (event) {
//                $("#loginNav").hide();
//                $("#adminLoginDiv").hide();
//                $("#loginErr").hide();
//                $("#navBarDiv").show();
//                $("#dashboardDiv").hide();
//                $("#allEmployeesDiv").hide();
//                $("#createAccountDiv").hide();
//                $("#createLocationDiv").hide();
//                $("#employeeInfoDiv").hide();
//                $("#healthSurveyDiv").hide();
//                $("#scheduleArrivalDiv").hide();
//                $("#deleteEmployeeDiv").show();
//
//                var userId = 7;
//
//                    $.ajax({
//                    type: 'GET',
//                    url: 'http://localhost:8080/api/admin/user/' + userId,
//                    headers: {
//                         'email': 'user@user.com',
//                         'password': 'password'
//                     },
//                    success: function(data, status) {
//                          $('#delete-first-name').val(data.firstName);
//                          $('#delete-last-name').val(data.lastName);
//                          $('#delete-email').val(data.email);
//                          $('#delete-password').val(data.passwords);
//                          $('#delete-location').val(data.location.cityName);
//                          $('#delete-role').val(data.role.name);
//                      },
//                      error: function() {
//                        $('#deleteErrorMessages')
//                           .append($('<li>')
//                           .attr({class: 'list-group-item list-group-item-danger'})
//                           .text('An error has occurred.'));
//                      }
//                    });
//
//
//            });
//
//                },
//                error: function() {
//                    $('#errorMessages')
//                        .append($('<li>')
//                        .attr({class: 'list-group-item list-group-item-danger'})
//                        .text('An error has occurred.'));
//                }
//
//            });     

                     },
                     error: function() {
                        $('#deleteErrorMessages')
                           .append($('<li>')
                           .attr({class: 'list-group-item list-group-item-danger'})
                           .text('An error has occurred.'));
                      }
                 });
             }
}

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