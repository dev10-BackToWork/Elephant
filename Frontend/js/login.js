$(document).ready(function () {

});



function loginSubmit() {
	var password = $(this.#inputPassword).val();
	var email = $(this.#inputEmail).val();

	var sendObject = {
		"password": password,
		"email": email
	}

	$.ajax({
		type: "post",
		url: "localhost:8080/api/user/login",
		data: sendObject,
		dataType: "json",
		success: function (response) {
			
		}
	});
}