$(document).ready(function () {

	$("#submitLoginButton").click(function(e) {
		e.preventDefault();
		var password = $("#inputPassword").val();
		var email = $("#inputEmail").val();
	
		$.ajax({
			type: "post",
			url: "https://back-towork.herokuapp.com/",
			headers: {
				"email": email,
				"password": password
			},
			success: function (response) {
				console.log(response);
				return false;
			},
			error: function(err) {
				console.log(err);
				return false;
			} 
		});
	
		return false;
	});
});



