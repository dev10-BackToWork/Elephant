$(document).ready(function () {
});



function loginSubmit() {
	var password = $("#inputPassword").val();
	var email = $("#inputEmail").val();

	$.ajax({
		type: "post",
		url: "http://localhost:8080/api/user/login",
		data: sendObject,
		dataType: "json",
		headers: {
			"email": email,
			"password": password
		},
		success: function (response) {
			
		}
	});
}