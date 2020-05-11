$(document).ready(function () {
});



function loginSubmit() {
	var password = $("#inputPassword").val();
	var email = $("#inputEmail").val();

	var sendObject = {
		"password": password,
		"email": email
	}

	$.ajax({
		type: "post",
		url: "http://localhost:8080/api/user/login",
		data: sendObject,
		dataType: "json",
		success: function (response) {
			
		}
	});
}