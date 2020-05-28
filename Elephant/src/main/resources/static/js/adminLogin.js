$(document).ready(function () {

    var adminLocation;
    var allLocations;
    var adminId;
    var adminEmail;
    var adminPassword;
    var user;

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
    $("#arrival-success").hide();
    $("#departure-success").hide();
    $("#overall-success").hide();
    $("#arrival-container").hide();
    $("#departure-container").hide();
    $("#screener-div").hide();
    $("#survey-div").hide();
    $("#screener-bye").hide();
    $("#survey-bye").hide();
    $("#deleteEmployeeDiv").hide();
    $("#successfulDeleteDiv").hide();
    $("#locationInfoDiv").hide();
    $('#time-success').hide();
    $("#loginErr").hide();
    $("#resetPasswordAdmin").hide();
    $("#edit-hashed-password").hide();
    

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
                    adminId = response.userId;
                    adminEmail = response.email;
                    adminPassword = response.defaultPW;
                    user = response;
                    
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
                        },
                        error: function (http) {
                            console.log(http);
                            console.log('An error resulted when attempting to retrieve locations.');
                        }
                    });
    
    
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
                     url: 'http://localhost:8080/api/admin/arrivals/' + locationId,
                     headers: {
                         'email': adminEmail,
                         'password': adminPassword
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
                         'email': adminEmail,
                         'password': adminPassword
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
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        $("#screener-div").show();
        $("#survey-div").hide();
        $("#screener-bye").hide();
        $("#survey-bye").hide();
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $('#time-success').hide();
        $("#loginErr").hide();  
        
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
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        $("#arrival-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        
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
             url: 'http://localhost:8080/api/admin/arrivals/' + locationId,
             headers: {
                'email': adminEmail,
                'password': adminPassword
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
                 'email': adminEmail,
                 'password': adminPassword
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
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
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
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
        
        $("#allEmployeeErr").hide();

        $('#contentRows').empty();

            var contentRows = $('#contentRows');
            var password = $("#inputPassword").val();
            var email = $("#inputEmail").val();
            var locationId = adminLocation;

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

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + email + '</td>';
                        row += '<td>' + location + '</td>';
                        row += '<td><button onclick="editSelectedUser(' + id + ')" class="btn btn-info">Edit</button></td>';
                        row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Delete</button></td>';
                        
                        row += '</tr>';
                        contentRows.append(row);
                    });

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
//                $("#successfulDeleteDiv").hide();
//                $("#locationInfoDiv").hide();
//
//                var userId = 7;
//
//                    $.ajax({
//                    type: 'GET',
//                    url: 'http://localhost:8080/api/admin/user/' + userId,
//                    headers: {
//                         'email': adminEmail,
//                         'password': adminPassword
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
//                           .text('An error has occurred.  Please try again later.'));
//                      }
//                    });
//
//
//            });

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
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();

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

    // $('#addLocationBtn').click(function (event) {
    //     $("#loginNav").hide();
    //     $("#adminLoginDiv").hide();
    //     $("#loginErr").hide();
    //     $("#navBarDiv").show();
    //     $("#dashboardDiv").hide();
    //     $("#allEmployeesDiv").hide();
    //     $("#createAccountDiv").hide();
    //     $("#createLocationDiv").show();
    //     $("#employeeInfoDiv").hide();
    //     $("#healthSurveyDiv").hide();
    //     $("#scheduleArrivalDiv").hide();
    //     $("#deleteEmployeeDiv").hide();
    //     $("#successfulDeleteDiv").hide();
    //     $("#locationInfoDiv").hide();
    // });
    
    $('#locationBtn').click(function (event) {
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
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").show();
        $("#arrival-success").hide();
        
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
              $('#edit-increment').val(data.location.timeIncrement);
              $('#edit-beginning').val(data.location.beginningTime);
              $('#edit-end').val(data.location.endTime);
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
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        $("#arrival-container").hide();
        $("#departure-container").hide();
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
    });
    
    $('#createAcctBtn').click(function (event) {
        
        // $("#allEmployeeErr").hide();

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
                    'email': adminEmail,
                    'password': adminPassword,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(userObj),
                success: function (data) {
                    console.log(data);
                    console.log('The request to generate ' + data.firstName + ' ' + data.lastName + ' was successful.');

                    // $("#loginNav").hide();
                    // $("#adminLoginDiv").hide();
                    // $("#loginErr").hide();
                    // $("#navBarDiv").show();
                    // $("#dashboardDiv").hide();
                    // $("#allEmployeesDiv").show();
                    // $("#createAccountDiv").hide();
                    // $("#createLocationDiv").hide();
                    // $("#employeeInfoDiv").hide();
                    // $("#healthSurveyDiv").hide();
                    // $("#scheduleArrivalDiv").hide();
                    // $("#deleteEmployeeDiv").hide();
                    // $("#successfulDeleteDiv").hide();
                    // $("#locationInfoDiv").hide();

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

        //     $.ajax({
        //         type: "GET",
        // //Need to change url so that it takes the admins location as the location id
        //         url: "http://localhost:8080/api/admin/users/" + adminLocation,
        //         headers: {
        //             "email": email,
        //             "password": password
        //         },
        //         success: function (data, status) {
        //             $.each(data, function (index, user) {
        //                 var name = user.firstName + ' ' + user.lastName;
        //                 var email = user.email;
        //                 var location = user.location.cityName;

        //                 var row = '<tr>';
        //                 row += '<td>' + name + '</td>';
        //                 row += '<td>' + email + '</td>';
        //                 row += '<td>' + location + '</td>';
        //                 row += '<td><a class="btn btn-info" href="employeeInfo.html">Edit</a></td>';
        //                 row += '<td><a class="btn btn-danger" href="#">Delete</a></td>';
        //                 row += '</tr>';
        //                 contentRows.append(row);
        //             });
        //         },
        //         error: function() {
        //             $('#errorMessages')
        //                 .append($('<li>')
        //                 .attr({class: 'list-group-item list-group-item-danger'})
        //                 .text('An error has occurred.'));
        //         }
        //     });
            }

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
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
        
        $("#allEmployeeErr").hide();
    })
    
    $('#submitEmployeeInfoBtn').click(function (event) {

        $('#editErrorMessages').empty();

        var errorCount = 0;
        
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

        if (passwordsField.length < 1) {
            $('#editErrorMessages').append($('<li>')
            .attr({class: 'list-group-item list-group-item-danger' })
            .text('Please enter a password.'));
        errorCount += 1;
        }
        
        if(errorCount == 0) {

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
                    'email': adminEmail,
                    'password': adminPassword,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(userObj),
                success: function (data) {
                    console.log(data);
                    console.log('The user information associated with ' + data.firstName + ' ' + data.lastName + ' was updated.');

                    // $("#loginNav").hide();
                    // $("#adminLoginDiv").hide();
                    // $("#loginErr").hide();
                    // $("#navBarDiv").show();
                    // $("#dashboardDiv").hide();
                    // $("#allEmployeesDiv").show();
                    // $("#createAccountDiv").hide();
                    // $("#createLocationDiv").hide();
                    // $("#employeeInfoDiv").hide();
                    // $("#healthSurveyDiv").hide();
                    // $("#deleteEmployeeDiv").hide();
                    // $("#successfulDeleteDiv").hide();
                    // $("#locationInfoDiv").hide();

                    $('#employeesBtn').click();
                },
                error: function (http) {
                    console.log('An error resulted when attempting to edit the specified user.')
                }
            });
        }
        
    });

    $("#reset-password-button").click(function (e) {

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
    });
    
    // $('#deleteEmployeeInfoBtn').click(function (event) {
    //     $("#loginNav").hide();
    //     $("#adminLoginDiv").hide();
    //     $("#loginErr").hide();
    //     $("#navBarDiv").show();
    //     $("#dashboardDiv").hide();
    //     $("#allEmployeesDiv").hide();
    //     $("#createAccountDiv").hide();
    //     $("#createLocationDiv").hide();
    //     $("#employeeInfoDiv").hide();
    //     $("#healthSurveyDiv").hide();
    //     $("#scheduleArrivalDiv").hide();
    //     $("#deleteEmployeeDiv").show();
    //     $("#successfulDeleteDiv").hide();
    //     $("#locationInfoDiv").hide();
    // });
    
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
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
    });
    

//    $('.deleteEmployeeBtn').click(function (event) {
//        
//        var userId = 7;
//
//         $.ajax({
//             type: 'DELETE',
//             url: 'http://localhost:8080/api/admin/user/' + userId,
//             headers: {
//                 'email': adminEmail,
//                 'password': adminPassword
//             },
//             success: function (data) {
//                 console.log(data);
//                 
//            $("#loginNav").hide();
//            $("#adminLoginDiv").hide();
//            $("#loginErr").hide();
//            $("#navBarDiv").show();
//            $("#dashboardDiv").hide();
//            $("#allEmployeesDiv").show();
//            $("#createAccountDiv").hide();
//            $("#createLocationDiv").hide();
//            $("#employeeInfoDiv").hide();
//            $("#healthSurveyDiv").hide();
//            $("#scheduleArrivalDiv").hide();
//            $("#deleteEmployeeDiv").hide();
//            $("#successfulDeleteDiv").hide();
//            $("#locationInfoDiv").hide();
//
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
//                    $("#successfulDeleteDiv").hide();
//                    $("#locationInfoDiv").hide();
//
//                    var userId = 7;
//
//                    $.ajax({
//                    type: 'GET',
//                    url: 'http://localhost:8080/api/admin/user/' + userId,
//                    headers: {
//                        'email': adminEmail,
//                        'password': adminPassword
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
//                $("#successfulDeleteDiv").hide();
//                $("#locationInfoDiv").hide();
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
//                $("#successfulDeleteDiv").hide();
//                $("#locationInfoDiv").hide();
//
//                var userId = 7;
//
//                    $.ajax({
//                    type: 'GET',
//                    url: 'http://localhost:8080/api/admin/user/' + userId,
//                    headers: {
//                         'email': adminEmail,
//                         'password': adminPassword
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
//
//                     },
//                     error: function() {
//                        $('#deleteErrorMessages')
//                           .append($('<li>')
//                           .attr({class: 'list-group-item list-group-item-danger'})
//                           .text('An error has occurred.'));
//                      }
//                 });
//
//
//
//        
//    });

    // $('.deleteEmployeeBtn').click(function (event) {
        
        
        
    //     var userId = 7;

    //      $.ajax({
    //          type: 'DELETE',
    //          url: 'http://localhost:8080/api/admin/user/' + userId,
    //          headers: {
    //              'email': adminEmail,
    //              'password': adminPassword
    //          },
    //          success: function (data) {
    //              console.log(data);
                 
    //         $("#loginNav").hide();
    //         $("#adminLoginDiv").hide();
    //         $("#loginErr").hide();
    //         $("#navBarDiv").show();
    //         $("#dashboardDiv").hide();
    //         $("#allEmployeesDiv").show();
    //         $("#createAccountDiv").hide();
    //         $("#createLocationDiv").hide();
    //         $("#employeeInfoDiv").hide();
    //         $("#healthSurveyDiv").hide();
    //         $("#scheduleArrivalDiv").hide();
    //         $("#deleteEmployeeDiv").hide();
    //         $("#successfulDeleteDiv").hide();
    //         $("#locationInfoDiv").hide();

    //         $("#allEmployeeErr").hide();

    //         $('#contentRows').empty();

    //         var contentRows = $('#contentRows');
    //         var password = $("#inputPassword").val();
    //         var email = $("#inputEmail").val();
    //         var locationId = adminLocation;

    //         $.ajax({
    //             type: "GET",
    //     //Need to change url so that it takes the admins location as the location id
    //             url: "http://localhost:8080/api/admin/users/" + locationId,
    //             headers: {
    //                 "email": email,
    //                 "password": password
    //             },
    //             success: function (data, status) {
    //                 $.each(data, function (index, user) {
    //                     var name = user.firstName + ' ' + user.lastName;
    //                     var email = user.email;
    //                     var location = user.location.cityName;
    //                     var id = user.userId;

    //                     var row = '<tr>';
    //                     row += '<td>' + name + '</td>';
    //                     row += '<td>' + email + '</td>';
    //                     row += '<td>' + location + '</td>';
    //                     row += '<td><button class="editAllEmployeeBtn btn btn-info">Edit</button></td>';
    //                     row += '<td><button onclick="deleteUser(' + id + ')" class="btn btn-danger">Delete</button></td>';
    //                     row += '</tr>';
    //                     contentRows.append(row);
    //                 });
    //             $('.editAllEmployeeBtn').click(function (event) {
    //                 $("#loginNav").hide();
    //                 $("#adminLoginDiv").hide();
    //                 $("#loginErr").hide();
    //                 $("#navBarDiv").show();
    //                 $("#dashboardDiv").hide();
    //                 $("#allEmployeesDiv").hide();
    //                 $("#createAccountDiv").hide();
    //                 $("#createLocationDiv").hide();
    //                 $("#employeeInfoDiv").show();
    //                 $("#healthSurveyDiv").hide();
    //                 $("#scheduleArrivalDiv").hide();
    //                 $("#deleteEmployeeDiv").hide();
    //                 $("#successfulDeleteDiv").hide();
    //                 $("#locationInfoDiv").hide();

    //                 var userId = 7;

    //                 $.ajax({
    //                 type: 'GET',
    //                 url: 'http://localhost:8080/api/admin/user/' + userId,
    //                 headers: {
    //                     'email': adminEmail,
    //                     'password': adminPassword
    //                  },
    //                 success: function(data, status) {
    //                       $('#edit-first-name').val(data.firstName);
    //                       $('#edit-last-name').val(data.lastName);
    //                       $('#edit-email').val(data.email);
    //                       $('#edit-password').val(data.passwords);
    //                       $('#edit-location').val(data.location.cityName);
    //                       $('#edit-role').val(data.role.name);
    //                   },
    //                   error: function() {
    //                     $('#editErrorMessages')
    //                        .append($('<li>')
    //                        .attr({class: 'list-group-item list-group-item-danger'})
    //                        .text('An error has occurred.  Please try again later.'));
    //                   }
    //                 });


    //              $("#loginNav").hide();
    //             $("#adminLoginDiv").hide();
    //             $("#loginErr").hide();
    //             $("#navBarDiv").show();
    //             $("#dashboardDiv").hide();
    //             $("#allEmployeesDiv").show();
    //             $("#createAccountDiv").hide();
    //             $("#createLocationDiv").hide();
    //             $("#employeeInfoDiv").hide();
    //             $("#healthSurveyDiv").hide();
    //             $("#scheduleArrivalDiv").hide();
    //             $("#deleteEmployeeDiv").hide();
    //             $("#successfulDeleteDiv").hide();
    //             $("#locationInfoDiv").hide();


    //             });

    //           $('.deleteAllEmployeeBtn').click(function (event) {
    //             $("#loginNav").hide();
    //             $("#adminLoginDiv").hide();
    //             $("#loginErr").hide();
    //             $("#navBarDiv").show();
    //             $("#dashboardDiv").hide();
    //             $("#allEmployeesDiv").hide();
    //             $("#createAccountDiv").hide();
    //             $("#createLocationDiv").hide();
    //             $("#employeeInfoDiv").hide();
    //             $("#healthSurveyDiv").hide();
    //             $("#scheduleArrivalDiv").hide();
    //             $("#deleteEmployeeDiv").show();
    //             $("#successfulDeleteDiv").hide();
    //             $("#locationInfoDiv").hide();

    //             var userId = 7;

    //                 $.ajax({
    //                 type: 'GET',
    //                 url: 'http://localhost:8080/api/admin/user/' + userId,
    //                 headers: {
    //                      'email': adminEmail,
    //                      'password': adminPassword
    //                  },
    //                 success: function(data, status) {
    //                       $('#delete-first-name').val(data.firstName);
    //                       $('#delete-last-name').val(data.lastName);
    //                       $('#delete-email').val(data.email);
    //                       $('#delete-password').val(data.passwords);
    //                       $('#delete-location').val(data.location.cityName);
    //                       $('#delete-role').val(data.role.name);
    //                   },
    //                   error: function() {
    //                     $('#deleteErrorMessages')
    //                        .append($('<li>')
    //                        .attr({class: 'list-group-item list-group-item-danger'})
    //                        .text('An error has occurred.'));
    //                   }
    //                 });


    //         });

    //             },
    //             error: function() {
    //                 $('#errorMessages')
    //                     .append($('<li>')
    //                     .attr({class: 'list-group-item list-group-item-danger'})
    //                     .text('An error has occurred.'));
    //             }

    //         });     

    //                  },
    //                  error: function() {
    //                     $('#deleteErrorMessages')
    //                        .append($('<li>')
    //                        .attr({class: 'list-group-item list-group-item-danger'})
    //                        .text('An error has occurred.'));
    //                   }
    //              });



        
    // });
    
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
        $("#deleteEmployeeDiv").hide();
        $("#successfulDeleteDiv").hide();
        $("#locationInfoDiv").hide();
        $("#arrival-success").hide();
        $("#departure-success").hide();
        $("#overall-success").hide();
    });

    $('#submitLocationInfoBtn').click(function (event) {
        
        var occupancy = $('#edit-occupancy').val();
        var increment = $('#edit-increment').val();
        var begin = $('#edit-beginning').val();
        var end = $('#edit-end').val();
        
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
        } else if (increment < 0) {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Time Increment cannot be a negative number.'));
            $("#editLocErrorMessages").show();
        } else if (increment === "") {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Time Increment must have a value.'));
            $("#editLocErrorMessages").show();
        } else if (increment.includes(".")) {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Time Increment must be a whole number.'));
            $("#editLocErrorMessages").show();
        } else if (begin === "") {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('Beginning Time must be a valid time.'));
            $("#editLocErrorMessages").show();
        } else if (end === "") {
            $("#editLocErrorMessages").empty();
            $('#editLocErrorMessages')
                    .append($('<li>')
                    .attr({class: 'list-group-item list-group-item-danger'})
                    .text('End Time must be a valid time.'));
            $("#editLocErrorMessages").show();
        } else {
            let beginString = begin;
            if (beginString.length === 5) {
                beginString = beginString.concat(":00");
            }
            let endString = end;
            if (endString.length === 5) {
                endString = endString.concat(":00");
            }

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
                
                $.ajax({
                    type: 'POST',
                    url: "http://localhost:8080/api/admin/timeIncrement/" + adminLocation + "/" + increment,
                    headers: {
                        'email': adminEmail,
                        'password': adminPassword
                    },
                    success: function (data) {
                        console.log(data);
                        console.log('Location Increment was updated');
                        
                        $.ajax({
                            type: 'POST',
                            url: "http://localhost:8080/api/admin/timeInterval/" + adminLocation + "/" + beginString + '/' + endString,
                            headers: {
                                'email': adminEmail,
                                'password': adminPassword
                            },
                            success: function (data) {
                                console.log(data);
                                console.log('Location Interval was updated');

                                $("#editLocErrorMessages").empty();

                                $('#editLocErrorMessages')
                                    .append($('<li>')
                                    .attr({class: 'list-group-item list-group-item-success'})
                                    .text('The office has been successfully updated.'));
                                $("#editLocErrorMessages").show();

                                    },
                                    error: function (http) {
                                        console.log('An error resulted when attempting to edit the location interval.')
                                    }
                        });

                    },
                    error: function (http) {
                         console.log('An error resulted when attempting to edit the location increment.')
                    }
                });

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
    $("#arrival-container").hide();
    $("#departure-container").hide();
   
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
    
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/users/coming",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                "isAttending": true,
                "isAuthorized": false,
                user: user
            }),

        headers: {
            "email": adminEmail,
            "password": adminPassword
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
    authorized();
   
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users/times/" + adminLocation,

        headers: {
            "email": adminEmail,
            "password": adminPassword
        },
        success: function (response) {
            //console.log(response);
            
            $("#arrival-btn-div").empty();
            var arrivalDiv = $("#arrival-btn-div");
            //var arrivalAccordianDiv = $("#arrival-accordion");
            var i;
            //var j;
            //var hours = ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
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
                        "email": adminEmail,
                        "password": adminPassword
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
    
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/users/times/" + adminLocation,
        headers: {
            "email": adminEmail,
            "password": adminPassword
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
                    data: JSON.stringify({"userId": adminId}),
                    contentType: "application/json;charset=UTF-8",

                    headers: {
                        "email": adminEmail,
                        "password": adminPassword
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
        //console.log(user);
    
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
            "email": adminEmail,
            "password": adminPassword
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
                populateEditRoleSelect(data.role.name);

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

    function populateEditRoleSelect(currentRole) {

        $('#edit-role').empty();
        
        var currentRoleIndex;

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/admin/roles/',
            headers: {
                'email': 'user@user.com',
                'password': 'password'
            },
            success: function (data) {
                console.log('The request for roles was successful.');
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
            $("#deleteEmployeeDiv").hide();
            $("#successfulDeleteDiv").show();
            $("#locationInfoDiv").hide();

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