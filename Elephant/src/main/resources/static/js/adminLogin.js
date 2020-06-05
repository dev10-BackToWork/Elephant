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
    $("#reportingDiv").hide();
    $("#createAccountDiv").hide();
    $("#createLocationDiv").hide();
    $("#employeeInfoDiv").hide();
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

                    $('#noResponseRows').empty();
                    $('#authPendRows').empty();
                    $('#arrivalRows').empty();

                    var noResponseRows = $('#noResponseRows');
                    var authPendRows = $('#authPendRows');
                    var arrivalRows = $('#arrivalRows');

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
                     url: 'http://localhost:8080/api/admin/occupants/' + locationId,
                     headers: {
                         'email': adminEmail,
                         'password': adminPassword
                     },
                     success: function (data) {
                         $.each(data, function(index, datum) {
                        var name = datum.firstName + ' ' + datum.lastName;
                        var location = datum.location.cityName;

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
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
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
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
    
    $('#dashboardBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").show();
        $("#allEmployeesDiv").hide();
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
       
        $("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        $("#arrivalErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();
        $('#arrivalRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');
        var arrivalRows = $('#arrivalRows');

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
                     url: 'http://localhost:8080/api/admin/occupants/' + locationId,
                     headers: {
                         'email': adminEmail,
                         'password': adminPassword
                     },
                     success: function (data) {
                         $.each(data, function(index, datum) {
                        var name = datum.firstName + ' ' + datum.lastName;
                        var location = datum.location.cityName;

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
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

    });
    
    $('#logoBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").show();
        $("#allEmployeesDiv").hide();
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        
                
        $("#noResErrorMessages").hide();
        $("#authErrorMessages").hide();
        $("#arrivalErrorMessages").hide();
        
        $('#noResponseRows').empty();
        $('#authPendRows').empty();
        $('#arrivalRows').empty();

        var noResponseRows = $('#noResponseRows');
        var authPendRows = $('#authPendRows');
        var arrivalRows = $('#arrivalRows');

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
                     url: 'http://localhost:8080/api/admin/occupants/' + locationId,
                     headers: {
                         'email': adminEmail,
                         'password': adminPassword
                     },
                     success: function (data) {
                         $.each(data, function(index, datum) {
                        var name = datum.firstName + ' ' + datum.lastName;
                        var location = datum.location.cityName;

                        var row = '<tr>';
                        row += '<td>' + name + '</td>';
                        row += '<td>' + location + '</td>';
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
    });
    
    $('#employeesBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
        $("#reportDiv").hide();
        
        $("#errorMessages").hide();
        $("#inactiveErrorMessages").hide();
        $("#inactiveEmployees").hide();
        $("#activeEmployees").show();
        $('#employeeOption').val(1);
        

        $('#contentRows').empty();
        $('#inactiveRows').empty();

            var contentRows = $('#contentRows');
            var inactiveRows = $('#inactiveRows');
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
    });
    
    
   $('#submitEmployeeOption').click(function (event) {  
       var option = $('#employeeOption').val();
       if (option == 1) {
            $("#activeEmployees").hide();
            $("#inactiveEmployees").hide();
            $("#activeEmployees").show();
        }
        if (option == 2) {
            $("#activeEmployees").hide();
            $("#inactiveEmployees").hide();
            $("#inactiveEmployees").show();
        }
  });
  
    $('#reportingBtn').click(function (event) {  
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportingDiv").show();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#overall-success").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
  });
    
    $('#createEmployeeBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportingDiv").hide();
        $("#createAccountDiv").show();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
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
    
    $('#locationBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
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
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
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

    $('#cancelAcctBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").show();
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();
        $("#locationInfoDiv").hide();
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
    
    $('#createLocationSubmitBtn').click(function (event) {
        $("#loginNav").hide();
        $("#adminLoginDiv").hide();
        $("#loginErr").hide();
        $("#navBarDiv").show();
        $("#dashboardDiv").hide();
        $("#allEmployeesDiv").hide();
        $("#reportingDiv").hide();
        $("#createAccountDiv").show();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").hide();
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
        $('#overall-success').show();
        $('#overall-success').text("You are authorized to come in to the office today and your response has been recorded."); 
        
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
        success: function (response, status) {
            console.log(response);
        },
        error: function (err) {
            console.log(err);

        }
    }); 
        
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
        $("#reportingDiv").hide();
        $("#createAccountDiv").hide();
        $("#createLocationDiv").hide();
        $("#employeeInfoDiv").show();
        $("#healthSurveyDiv").hide();
        $("#deleteEmployeeDiv").hide();

        var userId = id;

        $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/admin/user/' + userId,
        headers: {
                'email': 'twyborny@genesis10.com',
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
                'email': 'twyborny@genesis10.com',
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
                'email': 'twyborny@genesis10.com',
                'password': 'password'
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

    }



function deleteUser(userId) {  
        let isDelete = confirm("This user will be deactivated.");
        
    if (isDelete === true) {
        $.ajax({
             type: 'POST',
             url: 'http://localhost:8080/api/admin/deactivateUser/' + userId,
             headers: {
                 'email': 'twyborny@genesis10.com',
                 'password': 'password'
             },
             success: function (data) {
                 
                 $('#employeesBtn').click();
                 
             },
             error: function() {
                console.log(http);
                console.log('An error resulted when attempting to deactivate the user.');
             }
         });
     }

}

function activateUser(userId) {  
    let isActivate = confirm("This user will be activated.");
        
    if (isActivate === true) {
         
         $.ajax({
             type: 'POST',
             url: 'http://localhost:8080/api/admin/reactivateUser/' + userId,
             headers: {
                 'email': 'twyborny@genesis10.com',
                 'password': 'password'
             },
             success: function (data) {

                $("#loginNav").hide();
                $("#adminLoginDiv").hide();
                $("#loginErr").hide();
                $("#navBarDiv").show();
                $("#dashboardDiv").hide();
                $("#allEmployeesDiv").hide();
                $("#reportingDiv").hide();
                $("#createAccountDiv").hide();
                $("#createLocationDiv").hide();
                $("#employeeInfoDiv").hide();
                $("#healthSurveyDiv").hide();
                $("#deleteEmployeeDiv").hide();
                $("#successfulActivateDiv").show();
                $("#locationInfoDiv").hide();

                 
                $('#employeesBtn').click();

                
             },
             error: function (http) {
                 console.log(http);
                 console.log('An error resulted when attempting to activate the user.');
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

        //filter search function 
        //$(document).ready(function(){
        var locationId = 5;
         
       $("#reportingBtn").click(function (event) {
          loadReportDiv();
          $("#reportDiv").show();
           
       });
       
       
        function loadReportDiv(){
            $("#myList").hide();
            $("#noAttendees").hide();
            $("#isAttendingTable").hide();
            //load users to dropdown list
            getUsersByLocation(locationId);
            
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
  
       
    var nameInput;

        function getUsersByLocation(locationId) {
            $("#myList").empty();
            $("#myInput").val('');
            
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/admin/users/" + locationId,
                headers: {
                    'email': 'twyborny@genesis10.com',
                    'password': 'password'
                    //'email': adminEmail,
                    //'password': adminPassword
                },
                success: function (data, status) {
                    console.log(data);
                    var myList = $("#myList");
                    $.each(data, function (index, user) {
                          //nameInput = user.firstName + ' ' + user.lastName;
                          var name = user.firstName + ' ' + user.lastName;
                          var id = user.userId;
//                        var nameLi = "<li class='report-name' id="+id+">"+name;
                          var nameLi = "<li class='report-name' id="+id+">";
                          nameLi += '<button onclick="getAttendance(' + id + ')" class="btn report-user-select">'+name+'</button>';
                          nameLi += "</li>";
                          myList.append(nameLi); 
                    });

                },
                error: function() {
                    
                    $('#errorMessages')
                        .append($('<li>')
                        .attr({class: 'list-group-item list-group-item-danger'})
                        .text('An error has occurred.'));
                }

            });
        };

    
var day; // just day 
var month; // just month
var year; // just year 
var dateStringDisplay; //formatted to display on button
var fullDate2;
var dateStringId; //for date button id 

var btnIdString;

        function getAttendance (userId){
            $("#myList").hide();
//            var nameInput2 = this.name;
//            $("#myInput").val(nameInput2);
//            console.log(nameInput2);
             
            $.ajax({
             type: 'GET',
             url: 'http://localhost:8080/api/admin/datesPresent/' + userId,
             headers: {
                 'email': 'twyborny@genesis10.com',
                 'password': 'password'
             },
             success: function (data) {
                 console.log(data);
                 
                 console.log('The request for user ' + userId + ' attendance within the last 30 days was successful.');
                 $("#attendance-message").empty();
                 $('#report-attendance-dates').empty();
                 $("#isAttendingTable").hide();
                 $("#isAttendingRow").empty();
                  
                 var attendanceDateDiv = $('#report-attendance-dates');
                 if (data.length === 0) {
                     $("#attendance-message").html("The selected employee does not have any attendance records over the past 30 days.");
                        console.log('this user does not have any attendance records!');
                    }
                 else if (data.length > 0) {
                     $("#attendance-message").html("Over the past 30 days, the selected employee was in the office on the following dates.<br>Click a date to view all employees in the office."); 
                 }
                 $.each(data, function (i) {
                    var dateStringId = data[i].toString();
                    //console.log('dateStringId: ' + dateStringId);

                    fullDate2 = data[i].toString();
                    console.log(fullDate2);
                    year = fullDate2.substring(0, 4).trim();
                    var monthDate = fullDate2.substring(5);
                    month = monthDate.substring(0, 2).trim();
                    day = fullDate2.substring(8);
                    dateStringDisplay = month +'/' +day+'/'+year;
                    
                    var dateBtn = "<div class='col-2'>";
                    dateBtn += "<button class='report-date-submit' id='" + dateStringId + "'>";
                    dateBtn += "<p class='item'>" + month+'/' +day+'/'+year + "</p>";
                    dateBtn += "</button>";
                    dateBtn += "</div>";
                    attendanceDateDiv.append(dateBtn);
                    
                    
                });
                    
                    $(".report-date-submit").on("click", function() {
                        var btnId = this.id;
                        btnIdString = btnId.toString();
                        //console.log('clicked on ' + btnId + ' -- ' + btnIdString);
                        getEmployeesByDate();
                        $("#attendance-message").empty();
                        
//                        var attendanceMessageDiv = $('#attendance-message');
//                        attendanceMessageDiv.append(dateStringDisplay);
                    });
            },
            
             error: function (http) {
                 console.log(http);
                 console.log('An error resulted when attempting to retrieve user ' + userId + ' attendance within the last 30 days.');
             }
         });
     }
     

     //get value of date picker and send to ajax call
    $("#report-date-btn").on("click", function() {
        $("#myList").hide();
        $("#attendance-message").empty();
        var dateInput = $("#attendanceDate").val();
        btnIdString = dateInput.toString();
        console.log('clicked on: ' + btnIdString);
        getEmployeesByDate();
    });


    $('#myInput').click(function (e) {
        clearReport(); 
    });
        
        
      function clearReport() {
        $("input[type=date]").val(''); //reset date picker
        $('#noAttendees').hide(); //hide no attendees on date error 
        $("#attendance-message").empty();
    };


    function getEmployeesByDate(){
        var adminLocationId = 5;
        $(".report-date-submit").hide();
        console.log('date in get empl function: ' + btnIdString);
         $("#noAttendees").hide();
         var specifiedDate = btnIdString;

        $('#isAttendingRows').empty();
        
        $.ajax({
            type: 'GET',
             url: 'http://localhost:8080/api/admin/attendanceReport/' + adminLocationId + '/' + specifiedDate,
             headers: {
                'email': adminEmail,
                'password': adminPassword
             },

            success: function (response) {
                $("#isAttendingTable").show();
                $("#noAttendees").hide();

                console.log(response);
                if (response.length === 0) {
                    console.log("There are no attendance records on the date selected.");
                    $("#isAttendingTable").hide();
                    $("#noAttendees").show();
                    $("#noAttendees").text("There are no attendance records on the date selected.");
                }
                
                var isAttendingRows = $("#isAttendingRows");
                
                $.each(response, function (i, user) {
                    var userName = user.user.firstName + ' ' + user.user.lastName;
                    var userEmail = user.user.email;
                    var userLocation = user.user.location.cityName;
                    var row = '<tr>';
                
                if (response[i].isAttending === true) {
                    row = '<tr>';
                    row += '<td>' + userName + '</td>';
                    row += '<td>' + userEmail + '</td>';
                    row += '<td>' + userLocation + '</td>';
                    row += '<td>' +''+ '</td>';
                    row += '</tr>';
                    isAttendingRows.append(row);
                }
                if (row.length === 0) {
                    $("#noAttendees").show();
                    $("#noAttendees").text("There are no attendance records on the date selected.");
                    //isAttendingRows.append("There are no attendance records for the date selected");
                }
                
                console.log('The request for the attendance report was successful.' + specifiedDate);
                });
                
            },
             error: function (http) {
                 console.log(http);
                 console.log('An error resulted when attempting to retrieve the attendance report.' + specifiedDate);
            }
         });
     
 };








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
    // 
    // 
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


    // // ********** Preparing Ajax calls End