if (!localStorage.getItem("users")) {
	localStorage.setItem("users", JSON.stringify([{name: "Jonathan Lovelace", 
		username: "jonathan", pwd: "correctHorseBatteryStaple"}]));
}
function authenticate() {
	const users = JSON.parse(localStorage.getItem("users"));
	const uname = document.getElementById("username").value;
	const pwd = document.getElementById("password").value;
	if (uname === "admin" && pwd === "adminpassword") {
		localStorage.setItem("logged-in-user", "Administrator");
		return true;
	} else {
		for (const user of users) {
			if (user.username === uname && user.pwd === pwd) {
				localStorage.setItem("logged-in-user", user.name);
				return true;
			}
		}
		document.getElementById("errorMessageDiv").classList.remove("errorMessage");
		return false;
	}
}
