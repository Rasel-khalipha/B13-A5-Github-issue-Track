const signInBtn = document.getElementById("sign-in-btn");

signInBtn.addEventListener("click", () => {
	const userName = document.getElementById("input-username");
	const userNameValue = userName.value.trim().toLowerCase();
	console.log(userNameValue);
	const password = document.getElementById("input-password");
	const passwordValue = password.value.trim();
	console.log(passwordValue);

	if (userNameValue === "admin" && passwordValue === "admin123") {
		alert("Login successful!");
		userName.value = "";
		password.value = "";
		window.location.assign("/dashboard.html");
	} else {
		alert("Invalid user name or password.");
	}
});
