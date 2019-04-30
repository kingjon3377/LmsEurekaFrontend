if (!localStorage.getItem("users")) {
	localStorage.setItem("users", JSON.stringify([{name: "Jonathan Lovelace", 
		username: "jonathan", pwd: "correctHorseBatteryStaple"}]));
}
function authenticate() {
	console.log("In authenticate()");
	const users = JSON.parse(localStorage.getItem("users"));
	const uname = document.getElementById("username").value;
	const pwd = document.getElementById("password").value;
	if (uname === "admin" && pwd === "adminpassword") {
		console.log("Authenticated with back-door");
		localStorage.setItem("logged-in-user", "Administrator");
		return true;
	} else {
		for (const user of users) {
			if (user.username === uname && user.pwd === pwd) {
				console.log("Authenticated as " + user.username);
				localStorage.setItem("logged-in-user", user.name);
				return true;
			} else if (user.username === uname) {
				console.log("Known username, incorrect password");
			}
		}
		console.log("Failed to authenticate");
		return false;
	}
}
