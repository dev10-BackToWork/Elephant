$(document).ready(function () {
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
                    alert('admin - redirect to dashboard.html once added')
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



