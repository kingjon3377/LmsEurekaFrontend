if (!localStorage.getItem("branches")) {
	localStorage.setItem("branches", JSON.stringify([{"branchId": 2, "branchName": "Downtown Library", "branchAddress": "343 South Fifth Ave., Ann Arbor, MI 48104"}, {"branchId": 3, "branchName": "Pittsfield Branch Library", "branchAddress": "2359 Oak Valley Dr., Ann Arbor, MI 48103"}, {"branchId": 4, "branchName": "Malletts Creek Branch Library", "branchAddress": "3090 E Eisenhower Pkwy, Ann Arbor, MI 48108"}, {"branchId": 5, "branchName": "Sharpstown", "branchAddress": null}]));
}
function getBranches() {
	const branches = JSON.parse(localStorage.getItem("branches"));
	return (branches) ? branches : [];
}
function getBranch(id) {
	return getBranches().find((branch) => branch.branchId == id);
}
function saveBranch(branch) {
	const original = getBranches();
	let buffer = [];
	let found = false;
	for (item of original) {
		if (item.branchId == branch.branchId) {
			buffer.push(branch);
			found = true;
		} else {
			buffer.push(item);
		}
	}
	if (!found) {
		buffer.push(branch);
	}
	localStorage.setItem("branches", JSON.stringify(buffer));
}
function deleteBranch(branch) {
	const original = getBranches();
	let buffer = [];
	for (item of original) {
		if (item.branchId != branch.branchId) {
			buffer.push(item);
		}
	}
	localStorage.setItem("branches", JSON.stringify(buffer));
}
