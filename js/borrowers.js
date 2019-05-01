if (!localStorage.getItem("borrowers")) {
	localStorage.setItem("borrowers", JSON.stringify([{"name": "Molly Walker", "phone": null, "cardNo": 2, "address": null}, {"name": "Mary Morgan", "phone": null, "cardNo": 3, "address": null}, {"name": "Hamur Abi", "phone": null, "cardNo": 4, "address": null}, {"name": "Ibn Khaldoun", "phone": "PHN45", "cardNo": 12, "address": "ADR45"}]));
}
function getBorrowers() {
	const borrowers = JSON.parse(localStorage.getItem("borrowers"));
	return (borrowers) ? borrowers : [];
}
function getBorrower(id) {
	return getBorrowers().find((borrower) => borrower.cardNo == id);
}
function saveBorrower(borrower) {
	const original = getBorrowers();
	let buffer = [];
	let found = false;
	for (item of original) {
		if (item.cardNo == borrower.cardNo) {
			buffer.push(borrower);
			found = true;
		} else {
			buffer.push(item);
		}
	}
	if (!found) {
		buffer.push(borrower);
	}
	localStorage.setItem("borrowers", JSON.stringify(buffer));
}
function deleteBorrower(borrower) {
	const original = getBorrowers();
	let buffer = [];
	for (item of original) {
		if (item.cardNo != borrower.cardNo) {
			buffer.push(item);
		}
	}
	localStorage.setItem("borrowers", JSON.stringify(buffer));
}
