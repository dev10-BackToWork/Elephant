$(document).ready(function () {
    
    $("#allEmployeeErr").hide();

    $('#contentRows').empty();

    var contentRows = $('#contentRows');
//    var password = $("#inputPassword").val();
//    var email = $("#inputEmail").val();
//Need to change how we read in email and password
    var password = "password";
    var email = "user@user.com";

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



