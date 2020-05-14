$(document).ready(function () {

    // ********** Preparing Ajax calls Start

    // @DeleteMapping("/user/{id}")
    // public ResponseEntity<User> deleteUser
    $('#deleteUser2').click(function (event) {

        var userId = 2;

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/admin/user/' + userId,
            headers: {
                'email': 'user@user.com',
                'password': 'password'
            },
            success: function (data) {
                console.log(data);
            },
            error: function (http) {
                console.log("An error resulted when attempting to delete the specified user. As a result, the user many not have been deleted.");
            }
        });
    });

    // @PostMapping("/timeInterval/{id}/{startTime}/{endTime}")
    // public ResponseEntity<Location> editDailyTimeInterval
    $('#changeMinnTime').click(function (event) {

        var startTime = "05:20:00";
        var endTime = "17:20:00";

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/admin/timeInterval/1/' + startTime + '/' + endTime,
            headers: {
                'email': 'user@user.com',
                'password': 'password'
            },
            success: function (data) {
                console.log(data);
                console.log('The daily time interval of ' + data.cityName + ' was updated to ' + data.beginningTime + ' and ' + data.endTime + '.')
            },
            error: function (http) {
                console.log('An error resulted when attempting to update the daily time interval.');
            }
        });
    });

    // @PostMapping("/timeIncrement/{id}/{num}")
    // public ResponseEntity<Location> editIncrement
    $('#chaneAustinIncrement').click(function (event) {

        var locationId = 2;
        var newIncrement = 6;

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/admin/timeIncrement/' + locationId + '/' + newIncrement,
            headers: {
                'email': 'user@user.com',
                'password': 'password'
            },
            success: function (data) {
                console.log(data);
                console.log('The time slot increment of ' + data.cityName + ' was updated to ' + data.timeIncrement + ' minutes.')
            },
            error: function (http) {
                console.log('An error resulted when attempting to update the time increment.')
            }
        });
    });

    // @PostMapping("/capacity/{id}/{num")
    // public ResponseEntity<Location> editCapacity
    $('#chaneAustinCapacity').click(function (event) {

        var locationId = 2;
        var maxCapacity = 12;
        var userEmail = 'user@user.com';
        var userPassword = 'password';

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/admin/capacity/' + locationId + '/' + maxCapacity,
            headers: {
                'email': 'user@user.com',
                'password': 'password'
            },
            success: function (data) {
                console.log(data);
                console.log('The maximum capacity of ' + data.cityName + ' was updated to ' + data.maxOccupancy + ' people.')
            },
            error: function (http) {
                console.log('An error resulted when attempting to update the maximum capacity of the location.')
            }
        });
    });

    // ********** Preparing Ajax calls End

    $("#loginErr").hide();

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
                    window.location.replace('/healthSurvey.html');
                } else if (response.role.roleId === 1) {

                    window.location.replace('/dashboard.html');
                }
                return false;

            },
            error: function (err) {
                console.log(err);
                $('#loginErr').show();
                $('#loginErr').text("Either your username or password is incorrect. Please contact your branch administrator if you need assitance.");
                clearLogin();
                return false;
            }

        });
        return false;
    });

});

function clearLogin() {
    $('#inputEmail').click(function (e) {
        $('#loginErr').hide();
        $('.form-control').val('');
    });
};



